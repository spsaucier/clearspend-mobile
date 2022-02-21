import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { ChevronIconLeft } from '@/Components/Icons';
import { CSText } from '@/Components';

type Props = {
  backNav?: string;
};

export const OnboardingBackBtnNav = ({ backNav }: Props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  return (
    <View style={tw`flex`}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={tw`flex-row items-center justify-center self-start mt-4 px-2 py-1 bg-secondary-light`}
      >
        <ChevronIconLeft color={tw.color('white')} />
        <CSText style={tw`ml-2 text-2xs text-white`}>
          {(typeof backNav !== 'undefined' ? backNav : t('profile.backNav')).toUpperCase()}
        </CSText>
      </TouchableOpacity>
    </View>
  );
};
