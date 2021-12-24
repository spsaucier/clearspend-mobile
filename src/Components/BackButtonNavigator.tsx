import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { ChevronIconLeft } from '@/Components/Icons';
import { CSText } from '@/Components';

type Props = {
  backNav: string;
};

export const BackButtonNavigator = ({ backNav }: Props) => {
  const navigation = useNavigation();
  return (
    <View style={tw`flex`}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={tw`flex-row items-center justify-center self-start mt-4 px-2 py-1 bg-gray98`}
      >
        <ChevronIconLeft />
        <CSText style={tw`ml-2 text-2xs`}>{backNav.toUpperCase()}</CSText>
      </TouchableOpacity>
    </View>
  );
};
