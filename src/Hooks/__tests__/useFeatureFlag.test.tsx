import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useFeatureFlag } from '@/Hooks/useFeatureFlag';
import { FeatureFlagsContext } from '@/Services/FeatureFlags/FeatureFlagsProvider';
import { featureFlagDefaults } from '@/Services/FeatureFlags/flags';

describe('useFeatureFlag', () => {
  it('Returns the default value for a flag when allFlags object is not available from context', async () => {
    const wrapper = ({ children }: any) => (
      <FeatureFlagsContext.Provider
        value={{
          allFlags: undefined,
          flagsLoading: false,
          updateFeatureFlagState: () => Promise.resolve(),
        }}
      >
        {children}
      </FeatureFlagsContext.Provider>
    );

    const { result } = renderHook(() => useFeatureFlag('test-flag'), {
      wrapper,
    });

    expect(result.current).toStrictEqual({ enabled: false });
  });

  it('Returns the context value for a flag when flags are available from context', async () => {
    const wrapper = ({ children }: any) => (
      <FeatureFlagsContext.Provider
        value={{
          allFlags: { ...featureFlagDefaults, 'test-flag': { enabled: true } },
          flagsLoading: false,
          updateFeatureFlagState: () => Promise.resolve(),
        }}
      >
        {children}
      </FeatureFlagsContext.Provider>
    );

    const { result } = renderHook(() => useFeatureFlag('test-flag'), {
      wrapper,
    });

    expect(result.current).toStrictEqual({ enabled: true });
  });

  it('Handles missing individual flag object - returns default', async () => {
    const wrapper = ({ children }: any) => (
      <FeatureFlagsContext.Provider
        value={{
          // @ts-ignore
          allFlags: { ...featureFlagDefaults, 'test-flag': undefined },
          flagsLoading: false,
          updateFeatureFlagState: () => Promise.resolve(),
        }}
      >
        {children}
      </FeatureFlagsContext.Provider>
    );

    const { result } = renderHook(() => useFeatureFlag('test-flag'), {
      wrapper,
    });

    expect(result.current).toStrictEqual({ enabled: false });
  });
});
