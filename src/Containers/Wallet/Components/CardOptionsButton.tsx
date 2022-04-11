import React from 'react';
import { TouchableOpacity } from 'react-native';
import { OptionsIcon } from '@/Components/Icons';
import tw from '@/Styles/tailwind';

type Props = {
  onPress?: () => void;
  theme?: 'dark' | 'light';
};

export const CardOptionsButton = ({ onPress, theme = 'dark' }: Props) => {
  const darkTheme = theme === 'dark';
  return (
    <TouchableOpacity
      style={tw.style(
        'p-0.75 rounded mr-3',
        darkTheme ? 'bg-secondary-light' : 'bg-black bg-opacity-5',
      )}
      onPress={onPress}
    >
      <OptionsIcon color={darkTheme ? 'white' : 'black'} />
    </TouchableOpacity>
  );
};
