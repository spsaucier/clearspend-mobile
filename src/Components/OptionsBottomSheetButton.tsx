import React from 'react';
import { TouchableOpacity } from 'react-native';
import tw from '@/Styles/tailwind';
import { CSText as Text } from '@/Components';
import { IconBaseProps } from '@/Components/Icons/types';

interface Props {
  text: string;
  onPress: () => void;
  icon: React.ComponentType<IconBaseProps>;
}

const OptionsBottomSheetButton = ({ text, onPress, icon: Icon }: Props) => (
  <TouchableOpacity style={tw`flex-row items-center py-2`} onPress={onPress}>
    <Icon style={tw`w-6`} color={tw.color('black')} />
    <Text style={tw`text-sm ml-2.5`}>{text}</Text>
  </TouchableOpacity>
);

export default OptionsBottomSheetButton;
