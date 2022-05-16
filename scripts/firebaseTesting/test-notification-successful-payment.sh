#!/bin/bash

# Triggers a firebase message with a deeplink to a transaction in this format:
# clearspend://transaction/:transactionId

# Usage:
# Define the auth key for the firebase project (found in firebase console settings -> cloud messaging -> legacy API server key)
# export FIREBASE_AUTH_KEY=key

# The Firebase Cloud Messaging token for the device to send to. (found in the app dev menu)
# export TO_FCM_TOKEN=token

# The ID of the transaction to open in the app
# export TRANSACTION_ID=id

# Run the script (from project root):
# bash ./scripts/firebaseTesting/test-notification-successful-payment.sh

curl --request POST \
  --url https://fcm.googleapis.com/fcm/send \
  --header "Authorization: key=$FIREBASE_AUTH_KEY" \
  --header 'Content-Type: application/json' \
  --data "{\"collapseKey\":\"com.clearspend.android.dev\",
  \"data\":{\"link\":\"clearspend://transaction/$TRANSACTION_ID\"},
  \"to\":\"$TO_FCM_TOKEN\",
  \"notification\":{\"android\":{\"sound\":\"default\"},
  \"body\":\"Your payment of \$20.50 to Rocket Rides was approved\",\"title\":\"ClearSpend\"},
  \"ttl\":2419200}"
