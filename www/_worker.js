const RAPID_HOST = "muscle-group-image-generator.p.rapidapi.com";
const RAPID_BASE = "https://" + RAPID_HOST;

function json(data, status=200, extraHeaders={}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {"Content-Type":"application/json; charset=utf-8", ...extraHeaders}
  });
}

function cleanList(value) {
  if (!value) return "";
  return value.split(",").map(x => x.trim()).filter(Boolean).join(",");
}

async function rapidFetch(env, path, searchParams) {
  if (!env.RAPIDAPI_KEY) {
    return json({error:"RAPIDAPI_KEY secret is not configured in Cloudflare."}, 500);
  }
  const url = new URL(RAPID_BASE + path);
  for (const [key,value] of searchParams) {
    if (value !== "") url.searchParams.set(key,value);
  }
  return fetch(url.toString(), {
    method:"GET",
    headers:{
      "Content-Type":"application/json",
      "x-rapidapi-host":RAPID_HOST,
      "x-rapidapi-key":env.RAPIDAPI_KEY
    }
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/muscle-groups") {
      const upstream = await rapidFetch(env, "/v2/muscle-groups", []);
      const body = await upstream.arrayBuffer();
      return new Response(body, {
        status:upstream.status,
        headers:{
          "Content-Type":upstream.headers.get("Content-Type") || "application/json",
          "Cache-Control":"public, max-age=3600, s-maxage=86400",
          "X-Content-Type-Options":"nosniff"
        }
      });
    }

    if (url.pathname === "/api/muscle-image") {
      const primaryMuscles = cleanList(url.searchParams.get("primaryMuscles"));
      const secondaryMuscles = cleanList(url.searchParams.get("secondaryMuscles"));
      if (!primaryMuscles) return json({error:"Missing primaryMuscles"},400);

      const valid = /^[a-zA-Z0-9_,.-]+$/;
      if (!valid.test(primaryMuscles) || (secondaryMuscles && !valid.test(secondaryMuscles))) {
        return json({error:"Invalid muscle parameter"},400);
      }

      const size = url.searchParams.get("size") || "original";
      const transparent = url.searchParams.get("transparent") || "true";
      const backgroundColor = url.searchParams.get("backgroundColor") || "1A1A2E";
      const primaryColor = url.searchParams.get("primaryColor") || "EF4444";
      const secondaryColor = url.searchParams.get("secondaryColor") || "FB923C";

      const isMulti = !!secondaryMuscles;
      const params = isMulti
        ? new URLSearchParams({
            primaryMuscles,
            secondaryMuscles,
            size,
            primaryColor,
            secondaryColor,
            backgroundColor,
            transparent
          })
        : new URLSearchParams({
            muscles: primaryMuscles,
            size,
            color: primaryColor,
            backgroundColor,
            transparent
          });

      const cache = caches.default;
      const cacheKey = new Request(
        new URL("/__muscle_cache/" + (isMulti ? "multi" : "single") + "?" + params.toString(), request.url).toString(),
        {method:"GET"}
      );
      const cached = await cache.match(cacheKey);
      if (cached) return cached;

      const upstream = await rapidFetch(env, isMulti ? "/v2/images/multi" : "/v2/images/single", params);
      if (!upstream.ok) {
        const text = await upstream.text();
        return new Response(text, {
          status:upstream.status,
          headers:{
            "Content-Type":upstream.headers.get("Content-Type") || "application/json",
            "Cache-Control":"no-store"
          }
        });
      }

      const image = new Response(upstream.body, {
        status:upstream.status,
        headers:{
          "Content-Type":upstream.headers.get("Content-Type") || "image/png",
          "Cache-Control":"public, max-age=86400, s-maxage=2592000",
          "X-Content-Type-Options":"nosniff"
        }
      });
      ctx.waitUntil(cache.put(cacheKey, image.clone()));
      return image;
    }

    return env.ASSETS.fetch(request);
  }
};
