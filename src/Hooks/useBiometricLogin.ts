import { useCallback, useEffect, useState } from 'react';
import { MMKV, useMMKVString } from 'react-native-mmkv';
import { mixpanel } from '../Services/utils/analytics';
import { useIsMounted } from './useIsMounted';
import { useBiometrics } from './useBiometrics';
import { AVAILABLE_BIO_KEY, IS_AUTHED, LAST_ACTIVE_KEY } from '../Store/keys';

const useBiometricLogin = (
  onSuccessCallback?: () => void,
  onCancelCallback?: () => void,
  interceptCallback?: () => void,
) => {
  const { verifyBio, successfulBioLogin, loading, biometricsEnabled } = useBiometrics();
  const isMounted = useIsMounted();
  const [availableBio] = useMMKVString(AVAILABLE_BIO_KEY);
  const [hasPrompted, setHasPrompted] = useState(true);

  const onBiometricLogin = useCallback(() => {
    if (!hasPrompted) {
      setHasPrompted(true);
      const storage = new MMKV();
      setTimeout(async () => {
        const success = await verifyBio();
        if (success) {
          storage.set(IS_AUTHED, true);
          storage.set(LAST_ACTIVE_KEY, new Date().valueOf());
          mixpanel.track('LoginWithBiometrics', {
            type: availableBio,
          });
          if (!interceptCallback) {
            successfulBioLogin();
          } else {
            interceptCallback();
          }
          onSuccessCallback?.();
        } else {
          mixpanel.track('LoginWithBiometricsFailure', {
            type: availableBio,
          });
          onCancelCallback?.();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPrompted, availableBio]);

  const reprompt = useCallback(() => {
    if (hasPrompted) {
      setHasPrompted(false);
    } else {
      onBiometricLogin();
    }
  }, [hasPrompted, setHasPrompted, onBiometricLogin]);

  useEffect(() => {
    if (loading || !biometricsEnabled || !isMounted.current || hasPrompted) return;
    onBiometricLogin();
  }, [loading, biometricsEnabled, isMounted, onBiometricLogin, hasPrompted]);

  return {
    reprompt,
  };
};

export default useBiometricLogin;
