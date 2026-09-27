# Kinetosphere iOS RC9 — TestFlight 1.0 (8)

Synchronized with web v6.10.17. This iOS-only refinement keeps the working hosted HTTPS YouTube bridge and muscle-map routing from RC8, then adds three native presentation fixes:

- Player video card and right-side information card stretch to the same height on iPad/desktop-width layouts.
- Native iPad shell receives additional top safe-area clearance so the Kinetosphere header does not crowd the iPad/TestFlight window chrome.
- The canonical Kinetosphere orbit app icon is rendered to `resources/icon.png` and explicitly installed into the generated Xcode `AppIcon.appiconset` during Codemagic builds.

TestFlight build number: 8.

Do not deploy this ZIP to Cloudflare. The Cloudflare web baseline remains v6.10.17.


## RC10 build pipeline cleanup
- TestFlight build number is now derived automatically from the latest App Store Connect build and incremented by one.
- Publishing now uploads to App Store Connect without automatically submitting to TestFlight beta review, avoiding unnecessary post-processing failures during internal testing.


## RC12 — Smart Randomizer

Synchronized with web v6.10.18. Builder Smart Randomize now uses canonical identity, canonical-family relationships, movement-family diversity, muscle-load overlap, and provider diversity while preserving current Builder filters as hard constraints. The established hosted-YouTube iOS bridge, muscle-map routing, iPad polish, app icon, and automatic TestFlight build numbering are retained.


## RC13 — Builder UX + Smart Randomizer Preferences
- Synced with web v6.10.19.
- Smart Randomizer defaults: exact duplicate avoidance Maximum, similar movement avoidance High, provider diversity Low, muscle variety Off.
- Smart Randomizer can be disabled for plain random selection.
- Current Circuit drag handles support touch/pointer reordering on iOS.
- Current Circuit is the default circuit name.
- Mobile Builder order: Current Circuit, Saved Circuits, Exercise Library.
- Saved Circuits can collapse on mobile.
- Primary nav order: Build, Programs, Player, Discover, Settings.
- Player navigation and Launch Player use a yellow call-to-action treatment.
- User-facing Builder exercise cards no longer expose canonical metadata and suppress generic General Training labels.

## RC16 — Landscape Player + Prescription Precedence + YouTube Bridge Recovery
- Synced with web v6.10.22.
- Restores the hosted HTTPS YouTube bridge on native iOS to prevent error 153.
- Adds short-landscape iPhone Player geometry.
- Enforces prescription precedence so rep prescriptions do not inherit stale timers.
- Current Circuit/Saved Circuits are primary across desktop, iPad, and iPhone; exercise library is secondary.
- Fixes mobile Current Circuit field overflow and Player prescription/timer overlap.
- Saved Circuits explains when Guest mode prevents account-synced circuits from appearing.
- Smart Randomizer Preferences remain persistent and account-synced.
- Admin Media Health queue reads the new Supabase media_health_issues table.

## RC19 — Native layout regression recovery
- Synced with web v6.10.25.
- Restores native iOS safe-area header clearance across iPhone and iPad.
- Restores full-frame sizing for the hosted HTTPS YouTube bridge.
- Mobile Player tab now prepares the current Builder circuit automatically, matching web/iPad behavior.
- Adds viewport-height-aware iPad landscape Player geometry while keeping the video as the height authority.


RC19: native landscape Player now fits within 100dvh with a compact top navigation, height-authoritative 16:9 media stage, matching info card, and compact horizontal movement strip. Native muscle image API calls route through the deployed Kinetosphere Cloudflare origin.


RC19 reliability notes:
- Builder Choose Exercises picker now uses available viewport height instead of the legacy fixed 540px scroll box.
- Native iOS muscle images no longer depend on a CORS-sensitive /api/muscle-groups fetch; Worker API routes also emit CORS headers.
- Added interim Exercise & Health Disclaimer under Settings > About for later legal review.
- FUTURE: when providers supply licensed raw HLS/MP4 media, add native AirPlay routing / route picker and TV-optimized playback. Do not treat YouTube bridge content as provider-owned AirPlay media.
