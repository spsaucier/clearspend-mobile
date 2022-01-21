import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';

export default function useAsyncStorage<T>(key: string, defaultValue: T): {
  value?: T,
  setValue: (newValue: T) => Promise<void>,
  removeValue: () => Promise<void>,
  loading?: boolean,
  error?: Error,
} {
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState<T | undefined>();

  async function getValueFromAsyncStorage(): Promise<void> {
    try {
      setLoading(true);
      setError(undefined);
      setValue(defaultValue);
      const val = await AsyncStorage.getItem(key);
      if (val !== null) {
        setValue(JSON.parse(val));
      }
    } catch (e: unknown) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getValueFromAsyncStorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const handleSetValue = useCallback(async (newValue: T) => {
    const stringifiedValue = JSON.stringify(newValue);
    await AsyncStorage.setItem(key, stringifiedValue);

    setError(undefined);
    setValue(newValue);
    setLoading(false);
  }, [key]);

  const handleRemoveValue = useCallback(async () => {
    await AsyncStorage.removeItem(key);

    setError(undefined);
    setValue(undefined);
    setLoading(false);
  }, [key]);

  return {
    value,
    setValue: handleSetValue,
    removeValue: handleRemoveValue,
    loading,
    error,
  };
}
