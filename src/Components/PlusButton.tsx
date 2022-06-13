import React from 'react';
import { TouchableOpacity } from 'react-native';
import tw from '@/Styles/tailwind';
import { CSText as Text } from '@/Components';
import { PlusCircleFilledIcon } from '@/Components/Icons';

interface Props {
  testID?: string;
  text: string;
  onPress: () => void;
}

const PlusButton = ({ testID, text, onPress }: Props) => (
  <TouchableOpacity
    testID={testID}
    onPress={onPress}
    style={tw`flex-row justify-center items-center py-1.5 px-2 rounded-full bg-tan ml-auto`}
  >
    <PlusCircleFilledIcon />
    <Text style={tw`ml-1.5 text-secondary text-sm`}>{text}</Text>
  </TouchableOpacity>
);

export default PlusButton;
