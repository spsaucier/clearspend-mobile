import { featureFlagDefaults, FeatureFlagTypes } from '@/Services/FeatureFlags/flags';
import { useFeatureFlagsContext } from '@/Hooks/useFeatureFlagsContext';

export const useFeatureFlag = (flagKey: keyof FeatureFlagTypes) => {
  const { allFlags } = useFeatureFlagsContext();
  const defaultValue = featureFlagDefaults[flagKey];

  if (!allFlags) {
    return defaultValue;
  }

  const flagValue = allFlags[flagKey];

  if (!flagValue) {
    return defaultValue;
  }

  return flagValue;
};
