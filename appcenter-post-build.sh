#!/usr/bin/env bash

# This file is run by AppCenter post-build

# IMPORTANT: updating this file is not enough for app center to recognise the changes, you need to also go to the
# project admin panel and resave the build configuration after pushing the changes and before building.

if [[ "$APPCENTER_XCODE_PROJECT" ]]; then
  echo "iOS only post build script"
else
  echo "Android only post build script"

  # Upload successful builds to Firebase and SauceLabs
  if [[ "$AGENT_JOBSTATUS" == "Succeeded" ]]; then
    lowercase_env_name=$(tr '[:upper:]' '[:lower:]' <<<"${CS_ENV_NAME}")
    aab_name="app-$lowercase_env_name-release.aab"
    aab_location="android/app/build/outputs/bundle/$APPCENTER_ANDROID_VARIANT/$aab_name"

    npm install -g firebase-tools
    echo "Uploading build to Firebase"
    firebase appdistribution:distribute "$aab_location" \
      --app "$FIREBASE_APP_ID" \
      --groups "clearspend-testers"
    # TODO provide release notes
    # --release-notes ""

    # Only upload DEV builds
    if [[ "$CS_ENV_NAME" == "DEV" ]]; then
      echo "Uploading build to SauceLabs"
      curl \
        -F "payload=@$aab_location" \
        -F name="$aab_name" \
        -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY" 'https://api.us-west-1.saucelabs.com/v1/storage/upload'
    fi
  fi
fi
