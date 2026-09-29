
try {
  if (!/^https?:$/.test(window.location.protocol)) {
    document.documentElement.classList.add('native-capacitor-shell');
    const ua=navigator.userAgent||'';
    const platform=navigator.platform||'';
    const isIPad=/iPad/.test(ua) || (platform==='MacIntel' && navigator.maxTouchPoints>1);
    if(isIPad) document.documentElement.classList.add('native-ipad-shell');
  }
} catch (e) {}
