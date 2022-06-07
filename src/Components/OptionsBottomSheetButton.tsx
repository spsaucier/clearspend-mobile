import React from 'react';
import { TouchableOpacity } from 'react-native';
import tw from '@/Styles/tailwind';
import { CSText as Text } from '@/Components';
import { IconBaseProps } from '@/Components/Icons/types';

interface Props {
  testID?: string;
  text: string;
  onPress: () => void;
  icon: React.ComponentType<IconBaseProps>;
  disabled?: boolean;
}

const OptionsBottomSheetButton = ({ testID, text, onPress, icon: Icon, disabled }: Props) => (
  <TouchableOpacity
    testID={testID}
    style={tw.style(`flex-row items-center py-2`, disabled ? `opacity-50` : '')}
    onPress={onPress}
    disabled={disabled}
  >
    <Icon style={tw`w-6`} color={tw.color('black')} />
    <Text style={tw`text-sm ml-2.5`}>{text}</Text>
  </TouchableOpacity>
);

export default OptionsBottomSheetButton;
