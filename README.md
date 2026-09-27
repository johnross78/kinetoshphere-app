# Kinetosphere iOS RC9 — TestFlight 1.0 (8)

Synchronized with web v6.10.17. This iOS-only refinement keeps the working hosted HTTPS YouTube bridge and muscle-map routing from RC8, then adds three native presentation fixes:

- Player video card and right-side information card stretch to the same height on iPad/desktop-width layouts.
- Native iPad shell receives additional top safe-area clearance so the Kinetosphere header does not crowd the iPad/TestFlight window chrome.
- The canonical Kinetosphere orbit app icon is rendered to `resources/icon.png` and explicitly installed into the generated Xcode `AppIcon.appiconset` during Codemagic builds.

TestFlight build number: 8.

Do not deploy this ZIP to Cloudflare. The Cloudflare web baseline remains v6.10.17.
