/* eslint-disable react-hooks/exhaustive-deps */
import RNSInfo, { RNSensitiveInfoOptions } from 'react-native-sensitive-info';
import { useCallback, useEffect, useState } from 'react';
import Config from 'react-native-config';

import { useIsMounted } from './useIsMounted';

export const storageNamespace: RNSensitiveInfoOptions = {
  keychainService: Config.CS_API,
  sharedPreferencesName: Config.CS_API,
};

export const saveStorageItem = async (
  key: string,
  value: string,
  config: RNSensitiveInfoOptions = storageNamespace,
): Promise<null> => RNSInfo.setItem(key, value, config);

export const getStorageItem = async (
  key: string,
  config: RNSensitiveInfoOptions = storageNamespace,
): Promise<string | null> => RNSInfo.getItem(key, config);

export const deleteStorageItem = async (
  key: string,
  config: RNSensitiveInfoOptions = storageNamespace,
): Promise<null> => RNSInfo.deleteItem(key, config);

export const useSensitiveInfo = (storageKey?: string) => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const mounted = useIsMounted();

  useEffect(() => {
    (async () => {
      if (storageKey) {
        const storedData = await getStorageItem(storageKey, storageNamespace);
        if (mounted.current) {
          setData(storedData);
          setLoading(false);
        }
      }
    })();
  }, [storageKey, storageNamespace]);

  const setItem = useCallback(
    async (item: string) => {
      if (storageKey) {
        setData(item);
        await saveStorageItem(storageKey, item, storageNamespace);
      }
    },
    [storageKey, storageNamespace],
  );

  const deleteItem = useCallback(async () => {
    if (storageKey) {
      setData(null);
      await deleteStorageItem(storageKey, storageNamespace);
    }
  }, [storageKey, storageNamespace]);

  return { loading, data, setItem, deleteItem };
};
