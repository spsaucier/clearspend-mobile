import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { ChevronIconLeft } from '@/Components/Icons';
import { CSText } from './Text';

type Props = {
  backText?: string;
  onBackPress?: () => void;
  theme?: 'light' | 'dark';
  containerStyle?: StyleProp<ViewStyle>;
};

export const BackButtonNavigator = ({
  backText,
  onBackPress,
  theme = 'light',
  containerStyle,
}: Props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const darkTheme = theme === 'dark';
  return (
    <View style={[tw`flex`, containerStyle]}>
      <TouchableOpacity
        onPress={() => (onBackPress ? onBackPress() : navigation.goBack())}
        style={tw.style(
          'flex-row items-center justify-center self-start px-2 py-1',
          darkTheme ? 'bg-white bg-opacity-5' : 'bg-tan',
        )}
      >
        <ChevronIconLeft color={darkTheme ? 'white' : 'black'} />
        <CSText style={tw.style('ml-2 my-1 text-2xs', darkTheme ? 'text-white' : 'text-black')}>
          {(typeof backText !== 'undefined' ? backText : t('profile.backNav')).toUpperCase()}
        </CSText>
      </TouchableOpacity>
    </View>
  );
};
