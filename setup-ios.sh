#!/usr/bin/env bash
set -euo pipefail
npm install
if [ ! -d ios ]; then
  npx cap add ios
fi
npx cap sync ios
printf '\nKinetosphere iOS shell is ready. Open it with: npx cap open ios\n'
