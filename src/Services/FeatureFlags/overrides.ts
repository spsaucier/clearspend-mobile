import { FeatureFlagTypes } from '@/Services/FeatureFlags/flags';

/*
 * Override feature flags in __DEV__ mode here
 *
 * TODO: make this configurable outside of git
 */
export const overrides: Partial<FeatureFlagTypes> = {
  'test-flag': {
    enabled: false,
  },
  'view-admin': {
    enabled: true,
  },
  notifications: {
    enabled: true,
  },
  'request-funds': {
    enabled: false,
  },
};
