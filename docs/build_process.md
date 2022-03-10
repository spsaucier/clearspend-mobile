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
  - Merges latest main down through variant branches `main -> dev -> uat -> release`
  - App center is configured to automatically build each variant and push
  - App center handles uploading to TestFlight and Play Store
