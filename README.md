# Kinetosphere iOS TestFlight RC4

**Do not deploy this ZIP to Cloudflare.** It is the Git/Codemagic iOS development package.

Baseline: web v6.10.16.

RC4 changes:
- Fixes YouTube Error 153 on iOS/iPadOS by applying the Capacitor 8 main-WKWebView Referer patch from `@capgo/capacitor-youtube-player` v8.2.17 during `cap sync`.
- Uses `https://circuitbuilder.rosshomegym.com` as the native YouTube client/referrer origin.
- Routes native muscle image/API requests to the deployed Cloudflare origin while keeping relative API routes on web.
- Adds a bundled muscle-group capability fallback if native CORS prevents reading `/api/muscle-groups`; image rendering still uses the live `/api/muscle-image` endpoint.
- Adds `ITSAppUsesNonExemptEncryption=false` during the Codemagic iOS generation step.
- Uses Codemagic integration reference `Kinetosphere App Store Connect`.
- Fixes the TestFlight custom export JSON escaping.
- Sets TestFlight build number to 2 for this RC, since build 1.0 (1) already exists in App Store Connect.

Workflow:
1. Replace/commit these files at the GitHub repository root.
2. Run **Kinetosphere TestFlight Internal** in Codemagic.
3. Test YouTube playback and muscle maps on both iPhone and iPad.
