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
