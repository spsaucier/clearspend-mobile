import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import tw from '@/Styles/tailwind';
import { CSText as Text } from '@/Components';

interface Props {
  testID?: string;
  style?: StyleProp<ViewStyle>;
  text: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export const TileButton = ({ testID, style, text, icon, onPress }: Props) => (
  <View style={style}>
    <TouchableOpacity
      testID={testID}
      style={tw`justify-center items-center p-5 border border-gray-10 rounded`}
      onPress={onPress}
    >
      <View style={tw`justify-center items-center w-14 h-14 bg-pending rounded-full`}>{icon}</View>
      <Text style={tw`text-sm mt-3`}>{text}</Text>
    </TouchableOpacity>
  </View>
);
