import React, { createContext, FC, useCallback, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { LDFlagSet } from 'launchdarkly-react-native-client-sdk';
import { SharedLDClient } from '@/Services/FeatureFlags/SharedLDClient';
import { FeatureFlagTypes } from '@/Services/FeatureFlags/flags';
import { useUser } from '@/Queries';
import { overrides } from '@/Services/FeatureFlags/overrides';

type Props = {
  allFlags: FeatureFlagTypes | undefined;
  flagsLoading: boolean;
  updateFeatureFlagState: () => Promise<void>;
};

export const FeatureFlagsContext = createContext<Props | undefined>(undefined);

export const FeatureFlagsProvider: FC = ({ children }) => {
  const [flagsLoading, setFlagsLoading] = useState(false);
  const [allFlags, setFlags] = useState<LDFlagSet | undefined>();
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    const subscribe = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'inactive') {
        SharedLDClient.close();
      }
    });
    return () => subscribe.remove();
  }, []);

  const updateFeatureFlagState = useCallback(async () => {
    setFlagsLoading(true);
    const state = await SharedLDClient.allFlags();
    if (__DEV__) {
      const withOverrides = { ...state, ...overrides };
      setFlags(withOverrides);

      // eslint-disable-next-line no-console
      console.log('Feature Flags:\n', JSON.stringify(withOverrides, null, 2));
    } else {
      setFlags(state);
    }
    setFlagsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading || !user) {
      return;
    }

    SharedLDClient.identifyUser({ key: user.userId, email: user.email }).then(() => {
      updateFeatureFlagState();
    });
  }, [user, isLoading, updateFeatureFlagState]);

  const context = {
    allFlags: allFlags as FeatureFlagTypes | undefined,
    flagsLoading,
    updateFeatureFlagState,
  };

  return <FeatureFlagsContext.Provider value={context}>{children}</FeatureFlagsContext.Provider>;
};
