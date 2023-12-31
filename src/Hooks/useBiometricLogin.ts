import { useCallback, useEffect, useState } from 'react';
import { useMMKVString } from 'react-native-mmkv';
import FullStory from '@fullstory/react-native';
import { mixpanel } from '@/Services/utils/analytics';
import { useIsMounted } from './useIsMounted';
import { useBiometrics } from './useBiometrics';
import { AVAILABLE_BIO_KEY, IS_AUTHED, LAST_ACTIVE_KEY } from '@/Store/keys';
import { storage } from '@/Services/Storage/mmkv';

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
      setTimeout(async () => {
        const success = await verifyBio();
        const type = {
          type: availableBio,
        };
        if (success) {
          storage.set(IS_AUTHED, true);
          storage.set(LAST_ACTIVE_KEY, new Date().valueOf());
          mixpanel.track('LoginWithBiometrics', type);
          FullStory.event('LoginWithBiometrics', type);
          if (!interceptCallback) {
            successfulBioLogin();
          } else {
            interceptCallback();
          }
          onSuccessCallback?.();
        } else {
          mixpanel.track('LoginWithBiometricsFailure', type);
          FullStory.event('LoginWithBiometricsFailure', type);
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
