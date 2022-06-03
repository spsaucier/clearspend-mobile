#!/usr/bin/env bash

# This file is run by AppCenter pre-build
# Env variables with CS_ prefix are defined in AppCenter and echo'd here into .env

# IMPORTANT: updating this file is not enough for app center to recognise the changes, you need to also go to the
# project admin panel and resave the build configuration after pushing the changes and before building.

# Creates an .env from ENV variables for use with react-native-config
ENV_WHITELIST=${ENV_WHITELIST:-"^CS_"}
printf "Creating an .env file with the following whitelist:\n"
printf "%s\n" $ENV_WHITELIST
set | egrep -e $ENV_WHITELIST | sed 's/^CS_//g' > .env
printf "\n.env created with contents:\n\n"
cat .env

# iOS/Android specific pre build setup
if [[ "$APPCENTER_XCODE_PROJECT" ]]; then
  echo "iOS only pre build script"
  echo "Setting app center key in AppCenter-Config.plist"
  sed -i.bak "s/SECRET_REPLACED_HERE/${APPCENTER_SECRET_KEY}/g" ios/AppCenter-Config.plist
else
  echo "Android only pre build script"
  echo "Setting app center key in appcenter-config.json"
  sed -i.bak "s/SECRET_REPLACED_HERE/${APPCENTER_SECRET_KEY}/g" android/app/src/main/assets/appcenter-config.json
fi

if [[ "$CS_ENV_NAME" == "DEV"  ]] && [[ "$APPCENTER_BRANCH" == "builds/saucelabs-ios"  ]]; then
  echo "Building for simulator"
  yarn podinstall

  cd "$APPCENTER_SOURCE_DIRECTORY/ios" || die "cd to ios directory failed"
  /Applications/Xcode.app/Contents/Developer/usr/bin/xcodebuild \
    -sdk iphonesimulator archive ARCHS=x86_64 VALID_ARCHS=x86_64 \
    -workspace ClearSpendMobile.xcworkspace -scheme "ClearSpendMobileDEV" \
    -configuration "dev.Release" \
    -archivePath ~/iOSSimulatorBuild/App.xcarchive || die "Simulator build failed"

  sim_build_path=~/iOSSimulatorBuild/App.xcarchive/Products/Applications
  sim_build_name="ClearSpend DEV.app"
  sauce_zip="ClearSpend DEV.zip"

  zip -r "$sauce_zip" "$sim_build_path/$sim_build_name"

  echo "Uploading simulator build to SauceLabs"
  curl \
    -F "payload=@$sauce_zip" \
    -F name="$sauce_zip" \
    -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY" 'https://api.us-west-1.saucelabs.com/v1/storage/upload'

  # cancel the build now, there is a 60 minute timeout so there is not enough time to build the ad hoc signed release ipa
  OWNER_NAME="ClearSpend"
  APP_NAME="ClearSpend-iOS-DEV"

  curl -iv "https://appcenter.ms/api/v0.1/apps/$OWNER_NAME/$APP_NAME/builds/$APPCENTER_BUILD_ID" \
    -X PATCH \
    -d "{\"status\":\"cancelling\"}" \
    --header 'Content-Type: application/json' \
    --header "X-API-Token: $APPCENTER_API_TOKEN"
fi
