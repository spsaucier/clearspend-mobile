import React, { createContext, FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MMKV, useMMKVBoolean, useMMKVNumber } from 'react-native-mmkv';
import { persistor, store } from '@/Store';
import { killSession } from '@/Store/Session';
import { ReturnUseBiometrics, useBiometrics } from '@/Hooks/useBiometrics';
import { usePasscode } from '@/Hooks/usePasscode';
import { mixpanel } from '../utils/analytics';
import { MainScreens, TopScreens } from '@/Navigators/NavigatorTypes';
import { IS_AUTHED, JUST_SET_2FA_KEY, LAST_ACTIVE_KEY } from '@/Store/keys';
import { useRequireAuth } from '@/Hooks/useRequireAuth';
import { navigationRef } from '@/Navigators/Root';

/*
The AuthProvider provides a means to work with stateful values/effects/custom
hooks through context as they relate to authentication
*/

interface AuthContextInterface
  extends ReturnUseBiometrics,
    ReturnType<typeof useRequireAuth>,
    ReturnType<typeof usePasscode> {
  loggedIn: boolean;
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
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

const AuthProvider: FC = ({ children }) => {
  const [showLoadingPlaceholder, setShowLoadingPlaceholder] = useState(true);
  const [isNewUser, setNewUserFlag] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasCancelledAndSignedOut, setHasCancelledAndSignedOut] = useState(false);
  const [isWelcomeBack, setWelcomeBack] = useState(false);
  const { reset } = useNavigation();
  const bioProps = useBiometrics(setLoggedIn);
  const passcodeProps = usePasscode();
  const [, setLastSignedIn] = useMMKVNumber(LAST_ACTIVE_KEY);
  const [, setAuthed] = useMMKVBoolean(IS_AUTHED);
  const storage = new MMKV();
  const [, setJustSet2FA] = useMMKVBoolean(JUST_SET_2FA_KEY);

  const confirmAuth = (authedStatus = true) => {
    if (navigationRef.current?.getCurrentRoute()?.name !== MainScreens.ConfirmAuth) {
      setAuthed(authedStatus);
      if (bioProps.biometricsEnabled || passcodeProps.passcodeEnabled) {
        setShowLoadingPlaceholder(true);
        reset({
          index: 0,
          routes: [{ name: MainScreens.ConfirmAuth }],
        });
      } else {
        // Trying to confirm auth, but no Bio or Passcode enabled
      }
    } else {
      // Already on Bio/Passcode entry screen
    }
  };

  const onRequireAuth = (authedStatus = false) => {
    if (!authedStatus) {
      confirmAuth(authedStatus);
    } else {
      storage.set(LAST_ACTIVE_KEY, new Date().valueOf());
      storage.set(IS_AUTHED, true);
    }
  };

  const { setAutoLockTempDisabled } = useRequireAuth(onRequireAuth);

  const logout = async () => {
    mixpanel.track('Logout');
    mixpanel.flush();
    setAutoLockTempDisabled(true);
    setLoggedIn(false);
    setAuthed(false);
    setLastSignedIn(new Date().valueOf());
    navigationRef.current?.navigate(TopScreens.Auth);
    setJustSet2FA(false);
    await bioProps.disableBiometrics();
    await passcodeProps.disablePasscode();
    persistor.purge();
    store.dispatch(killSession());
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
    confirmAuth,
    setAutoLockTempDisabled,
    loading: bioProps.loading || passcodeProps.loading,
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
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
