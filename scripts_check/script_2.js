
(()=>{
  const KEY="kinetosphereAppearance";
  let pref="system";
  try{ pref=localStorage.getItem(KEY)||"system"; }catch(e){}
  if(!["system","light","dark"].includes(pref)) pref="system";
  const resolved=pref==="system"?(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):pref;
  document.documentElement.dataset.theme=resolved;
  document.documentElement.dataset.themePreference=pref;
})();
