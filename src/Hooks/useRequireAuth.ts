/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppState,
  AppStateEvent,
  AppStateStatus,
  NativeEventSubscription,
  Platform,
} from 'react-native';
import { useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';
import { mixpanel } from '@/Services/utils/analytics';
import { IS_AUTHED, LAST_ACTIVE_KEY } from '@/Store/keys';

export const REQUIRE_AUTH_TIMEOUT_SECONDS = 300;

/**
 * When our application is put into the background for a certain amount of time (5 minutes at the
 * time of writing this comment), we want to trigger an auth confirmation.
 *
 * @param onRequireAuth Method to flag that the user must authenticate again.
 */
export const useRequireAuth = (onRequireAuth: (loggedInStatus?: boolean) => void) => {
  const [temporarilyDisabled, setTemporarilyDisabled] = useState(false);
  const storage = new MMKV();

  const tooLongSinceLastActive = () => {
    const currentDate = new Date().valueOf();
    const lastActive = storage.getNumber(LAST_ACTIVE_KEY);
    const diff = currentDate - lastActive;
    const secondsSinceLastActive = Math.floor(diff / 1000);
    const hasBeenTooLong = secondsSinceLastActive >= REQUIRE_AUTH_TIMEOUT_SECONDS;
    return hasBeenTooLong;
  };

  const onInactive = async () => {
    if (temporarilyDisabled) return;

    mixpanel.track('App state changed to inactive/background');
    if (storage.getBoolean(IS_AUTHED) && !tooLongSinceLastActive()) {
      storage.set(LAST_ACTIVE_KEY, new Date().valueOf());
    }
  };

  const onActive = async () => {
    mixpanel.track('App state changed to active');
    setTemporarilyDisabled(false);
    onRequireAuth(!tooLongSinceLastActive());
  };

  const handleAppStateChange = async (newAppState: AppStateStatus) => {
    if (['background', 'inactive'].includes(newAppState)) {
      await onInactive();
    } else if (newAppState === 'active') {
      await onActive();
    }
  };

  useEffect(() => {
    const listeners: NativeEventSubscription[] = [];
    if (Platform.OS === 'ios') {
      listeners.push(AppState.addEventListener('change', handleAppStateChange));
    } else {
      listeners.push(AppState.addEventListener('focus' as AppStateEvent, onActive));
      listeners.push(AppState.addEventListener('blur' as AppStateEvent, onInactive));
    }

    return () => {
      listeners.forEach((l) => l.remove());
    };
  }, []);

  return {
    setAutoLockTempDisabled: setTemporarilyDisabled,
  };
};
