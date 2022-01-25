import { useMMKVBoolean, useMMKVNumber } from 'react-native-mmkv';

import { mixpanel } from '@/Services/utils/analytics';
import { useSensitiveInfo } from './useSensitiveInfo';
import { IS_PASSCODE_ENABLED } from '../Store/keys';

export const PASSCODE_KEY = 'PASSCODE_KEY';
const PASSCODE_ATTEMPT_COUNT_KEY = 'PASSCODE_ATTEMPT_COUNT_KEY';

export const usePasscode = () => {
  const [isPasscodeEnabled] = useMMKVBoolean(IS_PASSCODE_ENABLED);
  const [failedAttempts, setFailedAttempts] = useMMKVNumber(PASSCODE_ATTEMPT_COUNT_KEY);
  const {
    data: storedPasscode,
    loading: passcodeLoading,
    setItem: savePasscode,
    deleteItem: deletePasscode,
  } = useSensitiveInfo(PASSCODE_KEY);

  const incrementFailedAttempts = () => {
    setFailedAttempts((failedAttempts || 0) + 1);
  };

  const clearFailedAttempts = () => {
    setFailedAttempts(0);
  };

  const verifyPasscode = async (code: string) => {
    if (code === storedPasscode) {
      clearFailedAttempts();
      mixpanel.track('LoginWithPin');
      return true;
    }
    incrementFailedAttempts();
    mixpanel.track('LoginWithPinFailure');
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
