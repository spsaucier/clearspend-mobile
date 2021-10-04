import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { BackArrowIcon } from '@/Assets/Icons';

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
      <Text style={tw`text-lg text-black my-4 font-bold`}>{title}</Text>
    </View>
  );
};
