# Deep links

The app handles deeplinks with the `clearspend://` protocol using react navigation's automatic routing, 
as well as some manual handling when auth confirmation is required.

Deeplinks are delivered to the app via firebase messaging, with the `clearspend://` format link contained in the data object

## Supported formats

- Transaction details `clearspend://transaction/:transactionId`


## Testing

Having multiple variants of the app installed can cause issues with deeplink testing, to prevent the wrong clearspend app handling the link,
only install the variant that needs testing.

### Native deeplink testing

Use the `uri-scheme` cli tool:

iOS simulator:

`npx uri-scheme open clearspend://transaction/:transactionId --ios`


Android emulator:

`npx uri-scheme open clearspend://transaction/:transactionId --android`


### Firebase messaging deeplink testing

Use the testing scripts located in `scripts/firebaseTesting` to trigger notification payloads

Note: iOS simulators do not support notifications or firebase messaging, these must be tested on a real device.
Android emulators support notifications and firebase messaging
