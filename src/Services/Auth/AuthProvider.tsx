import React, { createContext, FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MMKV, useMMKVBoolean, useMMKVNumber } from 'react-native-mmkv';
import { persistor, store } from '@/Store';
import { killSession } from '@/Store/Session';
import { ReturnUseBiometrics, useBiometrics } from '@/Hooks/useBiometrics';
import { usePasscode } from '@/Hooks/usePasscode';
import { mixpanel } from '../utils/analytics';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { AVAILABLE_BIO_KEY, IS_AUTHED, IS_PASSCODE_ENABLED, LAST_ACTIVE_KEY } from '../../Store/keys';
import { useRequireAuth } from '@/Hooks/useRequireAuth';

/*
The AuthProvider provides a means to work with stateful values/effects/custom
hooks through context as they relate to authentication
*/

interface AuthContextInterface
  extends ReturnUseBiometrics,
    ReturnType<typeof useRequireAuth>,
    ReturnType<typeof usePasscode> {
  loggedIn: boolean;
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
  const [, setIsPasscodeEnabled] = useMMKVBoolean(IS_PASSCODE_ENABLED);
  const [, setLastSignedIn] = useMMKVNumber(LAST_ACTIVE_KEY);
  const [, setAuthed] = useMMKVBoolean(IS_AUTHED);
  const storage = new MMKV();

  const onRequireAuth = (loggedInStatus = false) => {
    // TODO: Also trigger if PIN enabled, log out if neither
    if (storage.getString(AVAILABLE_BIO_KEY)) {
      setLoggedIn(loggedInStatus);
      setShowLoadingPlaceholder(true);
      reset({
        index: 0,
        routes: [{ name: MainScreens.LoginShortcut }],
      });
    }
  };

  const { setAutoLockTempDisabled } = useRequireAuth(onRequireAuth);

  const passcodeProps = usePasscode();

  const logout = async () => {
    mixpanel.track('Logout');
    mixpanel.flush();
    setAutoLockTempDisabled(true);
    setLoggedIn(false);
    setAuthed(false);
    setLastSignedIn(new Date().valueOf());
    persistor.purge();
    bioProps.disableBiometrics();
    passcodeProps.removePasscode();
    setIsPasscodeEnabled(false);
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
    setAutoLockTempDisabled,
    loading: bioProps.loading || passcodeProps.loading,
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
