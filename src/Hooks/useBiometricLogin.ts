import { useCallback, useEffect } from 'react';
import { debounce } from 'lodash';

import { useAuthentication } from './useAuthentication';
import { mixpanel } from '../Services/utils/analytics';
import { useIsMounted } from './useIsMounted';
import { useAvailableBioMethod } from './useAvailableBioMethod';

const useBiometricLogin = (
  onSuccessCallback?: () => void,
  onCancelCallback?: () => void,
  interceptCallback?: () => void,
): void => {
  const { methodAvailable } = useAvailableBioMethod();
  const { verifyBio, successfulBioLogin, loading, biometricsEnabled, hasCancelledAndSignedOut } =
    useAuthentication();
  const isMounted = useIsMounted();

  const debouncedBiometricLogin = debounce(async () => {
    if (!isMounted.current) return;
    if (await verifyBio()) {
      mixpanel.track('LoginWithBiometrics', {
        type: methodAvailable,
      });
      if (!interceptCallback) {
        successfulBioLogin();
      } else {
        interceptCallback();
      }
      onSuccessCallback?.();
    } else {
      onCancelCallback?.();
      mixpanel.track('LoginWithBiometricsFailure', {
          type: methodAvailable,
        });
    }
  }, 1000);

  const onBiometricLogin = useCallback(debouncedBiometricLogin, [debouncedBiometricLogin]);

  useEffect(() => {
    if (loading || !biometricsEnabled || hasCancelledAndSignedOut) {
      return;
    }

    onBiometricLogin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);
};

export default useBiometricLogin;
