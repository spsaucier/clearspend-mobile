/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppState,
  AppStateEvent,
  AppStateStatus,
  NativeEventSubscription,
  Platform,
} from 'react-native';
import { useEffect, useState } from 'react';
import { mixpanel } from '@/Services/utils/analytics';
import useAsyncStorage from './useAsyncStorage';

export const LAST_ACTIVE_KEY = 'LAST_ACTIVE_KEY';
// export const REQUIRE_AUTH_TIMEOUT_MINUTES = 5;
export const REQUIRE_AUTH_TIMEOUT_MINUTES = 0;

/**
 * When our application is put into the background for a certain amount of time (5 minutes at the
 * time of writing this comment), we want to require that the user puts in their pin, has their bio
 * checked, or enters their password again. This hook handles that.
 *
 * @param onRequireAuth Method to flag that the user must authenticate again.
 */
export const useRequireAuth = (onRequireAuth: (loggedInStatus?: boolean) => void) => {
  const [temporarilyDisabled, disableTimeoutAuth] = useState(false);
  const {
    value: lastActive,
    setValue: setLastActive,
    removeValue: removeLastActive,
  } = useAsyncStorage<number | undefined>(LAST_ACTIVE_KEY, undefined);

  const onInactive = async () => {
    if (temporarilyDisabled) {
      return;
    }
    mixpanel.track('App state changed to background');
    await setLastActive(new Date().valueOf());
  };

  const onActive = async () => {
    mixpanel.track('App state changed to active');
    disableTimeoutAuth(false);

    if (typeof lastActive !== 'undefined') {
      const currentDate = new Date().valueOf();

      const diff = currentDate - lastActive;
      const minutesSinceLastActive = Math.floor(diff / 1000 / 60);

      if (minutesSinceLastActive >= REQUIRE_AUTH_TIMEOUT_MINUTES) {
        onRequireAuth(true);
        removeLastActive();
      }
    }
  };

  const handleAppStateChange = async (newAppState: AppStateStatus) => {
    // we'll wait a short time and then execute the lock,
    // this is just in case that the user opens the task switcher by mistake,
    // so if it returns rapidly to the app we'll keep the session
    if (['background', 'inactive'].includes(newAppState)) {
      await onInactive();
    } else if (newAppState === 'active') {
      // the user got back to the app, so we'll avoid the lock
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

  /**
   * Delete the last active key if the user reaches the splash screen. This key serves two
   * purposes.
   *
   * 1) Indicate the app has been backgrounded (but not terminated) by the user.
   *
   * 2) Save the time when the background occurred to be compared later.
   *
   * Since we can't detect force closures of the application (where we would prefer to remove
   * this flag), we remove it at the screen the app first opens when coming from a force close.
   */
  return {
    setAutoLockTempDisabled: disableTimeoutAuth,
    clearLastStoredBackgroundTime: removeLastActive,
  };
};
