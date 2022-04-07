#!/bin/bash

# Usage:
# Define the auth key for the firebase project (found in settings -> cloud messaging -> legacy API server key)
# export FIREBASE_AUTH_KEY=key

# The Firebase Cloud Messaging token for the device to send to. (found in the app dev menu)
# export TO_FCM_TOKEN=token

# Run the script:
# bash ./scripts/firebaseTesting/test-notification-successful-payment.sh

curl --request POST \
  --url https://fcm.googleapis.com/fcm/send \
  --header "Authorization: key=$FIREBASE_AUTH_KEY" \
  --header 'Content-Type: application/json' \
  --data "{\"collapseKey\":\"com.clearspend.android.dev\",
  \"data\":{\"link\":\"https://clearspend.com/transaction/e0c728f8-a2c5-4430-8d8c-f58086f22842\"},
  \"to\":\"$TO_FCM_TOKEN\",
  \"notification\":{\"android\":{\"sound\":\"default\"},
  \"body\":\"Your payment of \$20.50 to Rocket Rides was approved\",\"title\":\"ClearSpend\"},
  \"ttl\":2419200}"
