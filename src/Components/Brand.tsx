import React from 'react';
import { View, Image } from 'react-native';
import tw from '@/Styles/tailwind';

interface Props {
  height?: number | string;
  width?: number | string;
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
}

const logoImage = require('@/Assets/Images/tranwall.png');

export const Brand = ({ height = 200, width = 200, mode = 'contain' }: Props) => (
  <View style={{ height, width }}>
    <Image style={tw`h-full w-full`} source={logoImage} resizeMode={mode} />
  </View>
);
