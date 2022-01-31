import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';

const useNoBackPress = () => {
  useFocusEffect(
    useCallback(() => {
      const ignoreBackPress = () => true; // It must return true to block Android back button
      BackHandler.addEventListener('hardwareBackPress', ignoreBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', ignoreBackPress);
    }, []),
  );
};

export default useNoBackPress;
