import { useState, useEffect } from 'react';
import { storage } from '@/Services/Storage/mmkv';
import { useUser } from '@/Queries';
import { store } from '@/Store';
import { JUST_SET_2FA_KEY, SHOW_2FA_PROMPT_KEY } from '@/Store/keys';

const useRequire2FA = () => {
  const [shouldAct, setShouldAct] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isLoading, data: user } = useUser();
  const { session } = store.getState();

  useEffect(() => {
    if (user && session) {
      setLoading(true);
      const checkShouldAct = () => {
        const justSetUp2Fa = storage.getBoolean(JUST_SET_2FA_KEY);
        const mayShow2FaPrompt = storage.getBoolean(SHOW_2FA_PROMPT_KEY);
        switch (true) {
          case !mayShow2FaPrompt:
          case justSetUp2Fa:
          case user?.phone === '+11111111111':
            setShouldAct(false);
            break;
          case !session.twoFactor?.methods?.length:
            storage.set(SHOW_2FA_PROMPT_KEY, false);
            setShouldAct(true);
            break;
          default:
            setShouldAct(false);
            break;
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
