#!/usr/bin/env bash

# This file is run by AppCenter post-build

# IMPORTANT: updating this file is not enough for app center to recognise the changes, you need to also go to the
# project admin panel and resave the build configuration after pushing the changes and before building.

if [[ "$APPCENTER_XCODE_PROJECT" ]]; then
  echo "iOS only post build script"
else
  echo "Android only post build script"

  # Upload successful builds to firebase
  if [[ "$AGENT_JOBSTATUS" == "Succeeded" ]]; then

    lowercase_env_name=$(tr '[:upper:]' '[:lower:]' <<<"${CS_ENV_NAME}")

    npm install -g firebase-tools
    firebase appdistribution:distribute "android/app/build/outputs/bundle/$APPCENTER_ANDROID_VARIANT/app-$lowercase_env_name-release.aab" \
      --app "$FIREBASE_APP_ID" \
      --groups "clearspend-testers"
    # TODO provide release notes
    # --release-notes ""
  fi
fi
