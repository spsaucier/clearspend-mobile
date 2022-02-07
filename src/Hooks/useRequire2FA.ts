import { useState, useEffect } from 'react';
import { useUser } from '@/Queries';

const useRequire2FA = () => {
  const [shouldAct, setShouldAct] = useState(false);
  const { isLoading, error, data: user } = useUser();

  useEffect(() => {
    if (!isLoading && !error) {
      if (user && !user?.phone) {
        setShouldAct(true);
      } else {
        setShouldAct(false);
      }
    }
  }, [error, isLoading, user]);

  return { loading: isLoading, shouldAct };
};

export default useRequire2FA;
