# Builds

Build Service: Microsoft App Center

App links:
- [iOS DEV](https://appcenter.ms/orgs/ClearSpend/apps/ClearSpend-iOS-DEV)
- [iOS UAT](https://appcenter.ms/orgs/ClearSpend/apps/ClearSpend-iOS-UAT)
- [iOS PROD](https://appcenter.ms/orgs/ClearSpend/apps/ClearSpend-iOS-PROD)
- [Android DEV](https://appcenter.ms/orgs/ClearSpend/apps/ClearSpend-Android-DEV)
- [Android UAT](https://appcenter.ms/orgs/ClearSpend/apps/ClearSpend-Android-UAT)
- [Android PROD](https://appcenter.ms/orgs/ClearSpend/apps/ClearSpend-Android-PROD)

## Nightly Builds
- Scheduled bitbucket pipeline on `main`: `qa-nightly-build`
  - Bumps build numbers for both platforms, commit and tag result
  - Merges latest main down through variant branches `main -> builds/dev -> builds/uat -> builds/release`
  - App center is configured to automatically build each variant and push
  - App center handles uploading to TestFlight and Play Store
  - `appcenter-pre-build.sh` sets up the .env file and secrets for the build
  - `appcenter-post-build.sh` handles uploading to other services:
    - Firebase distribution (Android only)
    - SauceLabs (DEV variant only)
      - The Android AAB can be uploaded as is
      - A dedicated simulator build is necessary for testing iOS in the simulator on SauceLabs, this is built in the `appcenter-pre-build.sh` script for the `builds/saucelabs-ios` branch only
      - A dedicated Ad Hoc signed build is necessary for testing iOS on a SauceLabs physical device (only simulator is configured to build until the plan is upgraded to include real devices)
