import { useState, useEffect } from 'react';
import { useMMKVBoolean } from 'react-native-mmkv';
import { useUser } from '@/Queries';
import { store } from '@/Store';
import { JUST_SET_2FA_KEY } from '@/Store/keys';

const useRequire2FA = () => {
  const [shouldAct, setShouldAct] = useState(false);
  const { isLoading, error, data: user } = useUser();
  const { session } = store.getState();
  const [justSetUp2fa] = useMMKVBoolean(JUST_SET_2FA_KEY);

  useEffect(() => {
    if (!isLoading && !error) {
      if (user && !user?.phone) {
        setShouldAct(true);
      } else if (!session?.twoFactor?.methods?.length && !justSetUp2fa) {
        if (user?.phone === '+1111111111') {
          setShouldAct(false);
        } else {
          setShouldAct(true);
        }
      } else {
        setShouldAct(false);
      }
    }
  }, [error, isLoading, user, session, justSetUp2fa]);

  return { loading: isLoading, shouldAct };
};

export default useRequire2FA;
