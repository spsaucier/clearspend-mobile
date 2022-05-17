# Feature Flags

Used to enable, disable and generally configure features outside an app release cycle.

Served by LaunchDarkly: [Test Dashboard](https://app.launchdarkly.com/clear-spend-mobile/test/features/notifications/targeting)

Full list of current flag types and defaults here `src/Services/FeatureFlags/flags.ts`

## Local Development with Flags

To enable a flag while developing either configure it in the LaunchDarkly dashboard 
or add the value to the overrides object in `src/Services/FeatureFlags/overrides.ts`

## Creating a new Flag

1. Add the flag to the codebase in `flags.ts`
2. Use the value from `useFeatureFlag` to enable/disable/configure the feature
3. Create the flag in the LaunchDarkly dashboard, choose the JSON variation and set up the variants to match the structure and types in `flags.ts`
4. Configure the rollout in the Test environment
5. Deploy the app and configure the rollout in Production

Note: Use the JSON format only as it's easier to add more values to feature flags later without breaking old clients

Simple feature toggle format:

Enabled Variation
```json
{ "enabled": true }
```

Disabled Variation
```json
{ "enabled": false }
```

Define extra parameters as needed:
```json
{ 
  "enabled": false,
  "logAnalytics": false,
  "backgroundColor": "red",
  "numberOfRows": 4
}
```
