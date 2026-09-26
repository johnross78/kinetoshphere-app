# Kinetosphere Mobile — TestFlight RC5

This package is the iOS development candidate synchronized with web baseline **v6.10.16**.

RC5 changes:
- uses `@capgo/capacitor-youtube-player` 8.3.3 for native iOS YouTube playback instead of relying on the main Capacitor WKWebView iframe
- keeps the plugin Referer repair enabled with `https://www.youtube.com` for YouTube Error 152/153 handling
- retains native muscle/API routing through `https://circuitbuilder.rosshomegym.com`
- retains `ITSAppUsesNonExemptEncryption=false`
- TestFlight build number: **4**

This is an iOS development package — do not deploy to Cloudflare.
