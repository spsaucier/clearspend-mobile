#!/usr/bin/env bash

# This file is run by AppCenter pre-build
# Env variables with CS_ prefix are defined in AppCenter and echo'd here into .env

# Creates an .env from ENV variables for use with react-native-config
ENV_WHITELIST=${ENV_WHITELIST:-"^CS_"}
printf "Creating an .env file with the following whitelist:\n"
printf "%s\n" $ENV_WHITELIST
set | egrep -e $ENV_WHITELIST | sed 's/^CS_//g' > .env
printf "\n.env created with contents:\n\n"
cat .env

#cd ${APPCENTER_SOURCE_DIRECTORY}
#echo "BASE_URL=${BASE_URL}" > .env
#echo "FAQ_URL=${FAQ_URL}" >> .env
#echo "SOME_API_KEY=${INPUT_FROM_FORM}" >> .env
