Kinetosphere iOS RC8 / TestFlight build 1.0 (7)

Hosted HTTPS YouTube bridge at https://circuitbuilder.rosshomegym.com/embed/youtube for inline iOS playback. Native YouTube plugin removed.

# Kinetosphere Mobile — TestFlight RC6

This package is the iOS development candidate synchronized with web baseline **v6.10.16**.

RC6 changes:
- uses `@capgo/capacitor-youtube-player` 8.3.3 for native iOS YouTube playback instead of relying on the main Capacitor WKWebView iframe
- keeps the plugin Referer repair enabled with `https://www.youtube.com` for YouTube Error 152/153 handling
- retains native muscle/API routing through `https://circuitbuilder.rosshomegym.com`
- retains `ITSAppUsesNonExemptEncryption=false`
- TestFlight build number: **4**

This is an iOS development package — do not deploy to Cloudflare.


## RC6 YouTube recovery
- iOS YouTube exercises no longer use the inline native overlay.
- The Player card shows a stable Play Video surface.
- Tapping Play Video initializes the plugin in native fullscreen/modal mode.
- Web YouTube playback and Cloudflare Stream playback are unchanged.
- TestFlight build number: 5.


RC8: Fixes hosted YouTube bridge sizing on iOS by making #ytFrame and its bridge iframe fill the full 16:9 player surface. No Cloudflare redeploy required when v6.10.17 bridge is already live.
