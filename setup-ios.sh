#!/usr/bin/env bash
set -euo pipefail
npm install
if [ ! -d ios ]; then
  npx cap add ios
fi
npx cap sync ios
/usr/libexec/PlistBuddy -c "Set :ITSAppUsesNonExemptEncryption false" ios/App/App/Info.plist 2>/dev/null || \
  /usr/libexec/PlistBuddy -c "Add :ITSAppUsesNonExemptEncryption bool false" ios/App/App/Info.plist
printf '\nKinetosphere iOS shell is ready. Open it with: npx cap open ios\n'
