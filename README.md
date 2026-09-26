# Kinetosphere Mobile v1.0 — Cloud Build Candidate

**iOS development package — do not deploy this ZIP to Cloudflare.**

This package is synchronized with the stable Kinetosphere web baseline **v6.10.16** and is intended to become the first cloud-compiled iOS build.

## App identity
- App name: Kinetosphere
- Bundle ID: `com.kinetosphere.app`
- Capacitor: 8.0.0 (pinned)
- Shared client baseline: web v6.10.16
- Web directory: `www`

## Cloud-build sequence
1. Put this project in a Git repository.
2. Connect that repository to Codemagic.
3. Run `ios-simulator` first. This is an unsigned compile and does not need Apple signing.
4. Fix any native compile issue until the Simulator workflow passes.
5. Join the Apple Developer Program and create the Kinetosphere app record in App Store Connect if not already done.
6. Create an App Store Connect API key with App Manager access and connect it in Codemagic using the integration name `Kinetosphere`.
7. Run `ios-testflight` to create a signed IPA and submit it to TestFlight internal testing.
8. Install the TestFlight build on iPhone and iPad and run the device QA checklist.

## Current shared features
- Build Circuit, Programs / Flows, Discover, Player, Settings
- System / Light / Dark appearance
- Responsive phone/iPad layouts
- Provider storefront and entitlement model
- Favorites and program completion state
- Player timer and rep prescriptions
- iPad-safe countdown audio cues independent of video mute
- Licensed offline-media foundation and cache settings

## Important
The first cloud milestone is **successful iOS compilation**, not App Store release. Apple signing is intentionally kept out of the first compile so build-system issues can be diagnosed separately from certificate/provisioning issues.

## Dependency note
All Capacitor package versions are pinned in package.json. The cloud workflow uses npm install; the first cloud build should commit the generated package-lock.json back into the repository before subsequent release builds.
