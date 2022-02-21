import { useState, useEffect } from 'react';
import { MMKV } from 'react-native-mmkv';
import { useUser } from '@/Queries';
import { store } from '@/Store';
import { JUST_SET_2FA_KEY } from '@/Store/keys';

const useRequire2FA = () => {
  const [shouldAct, setShouldAct] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoading, data: user } = useUser();
  const { session } = store.getState();
  const storage = new MMKV();

  useEffect(() => {
    if (user) {
      setLoading(true);
      const checkShouldAct = async () => {
        const justSetUp2Fa = await storage.getBoolean(JUST_SET_2FA_KEY);
        if (!user?.phone) {
          setShouldAct(true);
        } else if (!session?.twoFactor?.methods?.length && !justSetUp2Fa) {
          if (user?.phone === '+11111111111') {
            setShouldAct(false);
          } else {
            setShouldAct(true);
          }
        } else {
          setShouldAct(false);
        }
        setLoading(false);
      };
      checkShouldAct();
    } else {
      setShouldAct(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, session]);

  return { loading: isLoading || loading, shouldAct };
};

export default useRequire2FA;
