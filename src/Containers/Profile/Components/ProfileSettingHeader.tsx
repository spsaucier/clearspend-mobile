import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { BackArrowIcon } from '@/Components/Icons';
import { CSText } from '@/Components';

type Props = {
  title: string;
};

export const ProfileSettingsHeader = ({ title }: Props) => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex`}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackArrowIcon />
      </TouchableOpacity>
      <CSText style={tw`text-lg text-black my-4 font-bold`}>{title}</CSText>
    </View>
  );
};
