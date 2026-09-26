Kinetosphere v6.10.16 — System / Light / Dark Appearance Foundation

Changes:
- Adds Settings > Preferences > Appearance with System, Light, and Dark modes.
- Defaults to System and follows the device/browser color scheme live.
- Saves appearance locally immediately and syncs the preference through the existing per-user settings store.
- Uses theme tokens for primary surfaces, text, borders, shadows, buttons, and mobile chrome.
- Switches the Kinetosphere header logo between light-background and dark-background variants.
- Keeps the workout Player on a deliberately dark media surface in both app themes for video, timer, and muscle-map readability.
- Adds light-mode mobile top bar, bottom navigation, and network-status treatments.
- Preserves v6.10.12 Player visual polish and all existing functionality.

Deployment requirement:
- Cloudflare project must retain RAPIDAPI_KEY as a Worker/Pages secret binding for muscle-image endpoints.
