import React, { createContext, FC, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useMMKVBoolean, useMMKVNumber } from 'react-native-mmkv';
import CookieManager from '@react-native-cookies/cookies';
import FullStory from '@fullstory/react-native';
import { persistor, store } from '@/Store';
import { killSession } from '@/Store/Session';
import { ReturnUseBiometrics, useBiometrics } from '@/Hooks/useBiometrics';
import { usePasscode } from '@/Hooks/usePasscode';
import { mixpanel } from '../utils/analytics';
import { IS_AUTHED, JUST_SET_2FA_KEY, LAST_ACTIVE_KEY } from '@/Store/keys';
import { useRequireAuth } from '@/Hooks/useRequireAuth';
import { useFeatureFlagsContext } from '@/Hooks/useFeatureFlagsContext';
import { storage } from '@/Services/Storage/mmkv';
import useNotificationsSettings from '@/Hooks/useNotificationsSettings';

/*
The AuthProvider provides a means to work with stateful values/effects/custom
hooks through context as they relate to authentication
*/

interface AuthContextInterface
  extends ReturnUseBiometrics,
    ReturnType<typeof useRequireAuth>,
    ReturnType<typeof usePasscode> {
  loggedIn: boolean;
  authed: boolean;
  setAuthed: (show: boolean) => void;
  setLoggedIn: (show: boolean) => void;
  logout: () => void;
  isNewUser: boolean;
  setNewUserFlag: (newUser: boolean) => void;
  showLoadingPlaceholder: boolean;
  setShowLoadingPlaceholder: (showLoading: boolean) => void;
  hasCancelledAndSignedOut: boolean;
  setHasCancelledAndSignedOut: (toggle: boolean) => void;
  isWelcomeBack: boolean;
  setWelcomeBack: (isWelcomeBack: boolean) => void;
  isLoggingOut: boolean;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

const AuthProvider: FC = ({ children }) => {
  const queryClient = useQueryClient();
  const { updateFeatureFlagState } = useFeatureFlagsContext();

  const [showLoadingPlaceholder, setShowLoadingPlaceholder] = useState(true);
  const [isNewUser, setNewUserFlag] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasCancelledAndSignedOut, setHasCancelledAndSignedOut] = useState(false);
  const [isWelcomeBack, setWelcomeBack] = useState(false);
  const bioProps = useBiometrics(setLoggedIn);
  const passcodeProps = usePasscode();
  const [, setLastSignedIn] = useMMKVNumber(LAST_ACTIVE_KEY);
  const [authed, setAuthed] = useState<boolean>(false);
  const [, setJustSet2FA] = useMMKVBoolean(JUST_SET_2FA_KEY);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { resetNotificationsSettings } = useNotificationsSettings();

  const onRequireAuth = (authedStatus = false) => {
    if (!authedStatus) {
      setAuthed(false);
      updateFeatureFlagState();
    } else {
      storage.set(LAST_ACTIVE_KEY, new Date().valueOf());
      storage.set(IS_AUTHED, true);
    }
  };

  const { setAutoLockTempDisabled } = useRequireAuth(onRequireAuth);

  const logout = async () => {
    setIsLoggingOut(true);
    mixpanel.track('Logout');
    mixpanel.flush();
    FullStory.event('Logout', {});
    FullStory.restart();
    setAutoLockTempDisabled(true);
    setLoggedIn(false);
    setAuthed(false);
    storage.set(IS_AUTHED, false);
    setLastSignedIn(new Date().valueOf());
    setJustSet2FA(false);
    resetNotificationsSettings();
    await bioProps.disableBiometrics();
    await passcodeProps.disablePasscode();
    await CookieManager.clearAll();
    await queryClient.resetQueries();
    queryClient.setQueryData('user', undefined);
    persistor.purge();
    store.dispatch(killSession());
    setIsLoggingOut(false);
  };

  useEffect(() => {
    (async () => {
      const lastSignedIn = storage.getNumber(LAST_ACTIVE_KEY);
      if (loggedIn) {
        await setAuthed(true);
        await setLastSignedIn(new Date().valueOf());
        setAutoLockTempDisabled(false);
      } else if (lastSignedIn) {
        const diffMs = new Date().valueOf() - lastSignedIn;
        const diffDays = diffMs / 86400000;
        const noLoginWithin30Days = diffDays >= 30;
        if (noLoginWithin30Days) {
          logout();
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const context = {
    ...bioProps,
    ...passcodeProps,
    setAutoLockTempDisabled,
    loading: bioProps.loading || passcodeProps.loading,
    authed,
    setAuthed,
    setLoggedIn,
    loggedIn,
    logout,
    isNewUser,
    setNewUserFlag,
    showLoadingPlaceholder,
    setShowLoadingPlaceholder,
    hasCancelledAndSignedOut,
    setHasCancelledAndSignedOut,
    isWelcomeBack,
    setWelcomeBack,
    isLoggingOut,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
