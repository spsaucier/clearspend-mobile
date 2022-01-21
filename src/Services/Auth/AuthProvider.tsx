import React, { createContext, FC, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useRequireAuth } from '@/Hooks/useRequireAuth';
import { persistor, store } from '@/Store';
import { killSession } from '@/Store/Session';
import { ReturnUseBiometrics, useBiometrics } from '@/Hooks/useBiometrics';
import { usePasscode } from '@/Hooks/usePasscode';
import { MainScreens } from '../../Navigators/NavigatorTypes';
import { mixpanel } from '../utils/analytics';
import useAsyncStorage from '../../Hooks/useAsyncStorage';
import { IS_BIOMETRIC_ENABLED, IS_PASSCODE_ENABLED } from '@/Store/keys';

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
const LAST_SIGNED_IN = 'LAST_SIGNED_IN';

const AuthProvider: FC = ({ children }) => {
  const [showLoadingPlaceholder, setShowLoadingPlaceholder] = useState(true);
  const [isNewUser, setNewUserFlag] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [hasCancelledAndSignedOut, setHasCancelledAndSignedOut] = useState(false);
  const [isWelcomeBack, setWelcomeBack] = useState(false);
  const { navigate } = useNavigation();
  const { removeValue: clearStoredBiometric } = useAsyncStorage(IS_BIOMETRIC_ENABLED, false);
  const { removeValue: clearStoredPasscode } = useAsyncStorage(IS_PASSCODE_ENABLED, false);
  const { value: lastLoggedIn, setValue: setLastSignedIn } = useAsyncStorage(LAST_SIGNED_IN, 0);

  const passcodeProps = usePasscode();
  const bioProps = useBiometrics(setLoggedIn);

  const logout = async () => {
    mixpanel.track('Logout');
    mixpanel.flush();
    setLoggedIn(false);
    await bioProps.enableBiometrics(false);
    await passcodeProps.removePasscode();
    await clearStoredBiometric();
    await clearStoredPasscode();
    await persistor.purge();
    store.dispatch(killSession());
  };

  useEffect(() => {
    (async () => {
      if (loggedIn) {
        await setLastSignedIn(new Date().valueOf());
      } else if (lastLoggedIn) {
        const diffMs = new Date().valueOf() - lastLoggedIn;
        const diffDays = diffMs / 86400000;
        const noLoginWithin30Days = diffDays >= 30;
        if (noLoginWithin30Days) {
          logout();
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn, lastLoggedIn]);

  const onRequireAuth = (loggedInStatus = false) => {
    setLoggedIn(loggedInStatus);
    setShowLoadingPlaceholder(true);
    navigate(MainScreens.LoginShortcut);
  };

  const context = {
    ...bioProps,
    ...useRequireAuth(onRequireAuth),
    ...passcodeProps,
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
