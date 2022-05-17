import { createContextHook } from '@/Services/utils/createContextHook';
import { FeatureFlagsContext } from '@/Services/FeatureFlags/FeatureFlagsProvider';

export const useFeatureFlagsContext = createContextHook(
  FeatureFlagsContext,
  'FeatureFlagsContext',
  'useFeatureFlagsContext',
);
