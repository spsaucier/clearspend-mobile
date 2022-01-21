import { useEffect } from 'react';

import { mixpanel } from '@/Services/utils/analytics';
import { useSensitiveInfo } from './useSensitiveInfo';
import useAsyncStorage from './useAsyncStorage';
import { IS_PASSCODE_ENABLED } from '../Store/keys';

export const PASSCODE_KEY = 'PASSCODE_KEY';
const PASSCODE_ATTEMPT_COUNT_KEY = 'PASSCODE_ATTEMPT_COUNT_KEY';

export const usePasscode = () => {
  const { value: isPasscodeEnabled } = useAsyncStorage(IS_PASSCODE_ENABLED, false);
  const {
    value: failedAttempts,
    loading: failedAttemptsLoading,
    setValue: setFailedAttempts,
  } = useAsyncStorage(PASSCODE_ATTEMPT_COUNT_KEY, 0);
  const {
    data: storedPasscode,
    loading: passcodeLoading,
    setItem: savePasscode,
    deleteItem: deletePasscode,
  } = useSensitiveInfo(PASSCODE_KEY);

  useEffect(() => {
    if (!failedAttemptsLoading && typeof failedAttempts !== 'undefined') {
      setFailedAttempts(failedAttempts + 1);
    }
  }, [failedAttempts, failedAttemptsLoading, setFailedAttempts]);

  const clearFailedAttempts = () => {
    setFailedAttempts(0);
  };

  const verifyPasscode = async (code: string) => {
    if (code === storedPasscode) {
      clearFailedAttempts();
      mixpanel.track('LoginWithPin');
      return true;
    }
    if (typeof failedAttempts !== 'undefined') {
      setFailedAttempts(failedAttempts + 1);
      mixpanel.track('LoginWithPinFailure');
    }
    return false;
  };

  const removePasscode = async () => {
    await deletePasscode();
    mixpanel.track('PinDisabled');
    clearFailedAttempts();
  };

  const setPasscode = async (passcode: string) => {
    await savePasscode(passcode);
    mixpanel.track('PinEnabled');
  };

  return {
    passcodeActive: !!storedPasscode,
    setPasscode,
    removePasscode,
    verifyPasscode,
    failedAttempts,
    clearFailedAttempts,
    loading: passcodeLoading,
    isPasscodeEnabled,
  };
};
