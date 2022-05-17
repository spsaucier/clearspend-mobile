import React, { FC } from 'react';
import { featureFlagDefaults, FeatureFlagTypes } from '@/Services/FeatureFlags/flags';
import { FeatureFlagsContext } from '@/Services/FeatureFlags/FeatureFlagsProvider';

type Props = {
  overrides?: Partial<FeatureFlagTypes>;
  flagsLoading?: boolean;
};

export const MockFeatureFlagsProvider: FC<Props> = ({ children, overrides, flagsLoading }) => (
  <FeatureFlagsContext.Provider
    value={{
      allFlags: { ...featureFlagDefaults, ...overrides },
      flagsLoading: flagsLoading ?? false,
      updateFeatureFlagState: () => Promise.resolve(),
    }}
  >
    {children}
  </FeatureFlagsContext.Provider>
);
