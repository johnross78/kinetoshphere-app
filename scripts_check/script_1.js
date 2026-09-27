
try {
  if (!/^https?:$/.test(window.location.protocol)) document.documentElement.classList.add('native-capacitor-shell');
} catch (e) {}
