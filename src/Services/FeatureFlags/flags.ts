type Enabled = {
  enabled: boolean;
};

/*
  All feature flag types in the app
  See docs/feature_flags.md for instructions on adding a new flag
 */
export type FeatureFlagTypes = {
  // flag not defined in LD used for tests
  'test-flag': Enabled;
  // -------------------------------------
  'view-admin': Enabled;
  'view-dev-menu': Enabled;
  notifications: Enabled;
};

export const featureFlagDefaults: { [K in keyof FeatureFlagTypes]: FeatureFlagTypes[K] } = {
  'test-flag': {
    enabled: false,
  },
  'view-admin': {
    enabled: false,
  },
  'view-dev-menu': {
    enabled: false,
  },
  notifications: {
    enabled: false,
  },
};
