import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { Button } from '@/Components';
import { OrganizationCard } from '@/Containers/Onboarding/Components/OrganizationCard';
import { OnboardingHeader } from '@/Containers/Onboarding/Components/OnboardingHeader';
import { MerchantIcon } from '@/Components/Icons';

const SelectOrganizationScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const handleSubmit = () => {
    navigation.navigate('Enter Mobile');
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-primary`}>
      <View style={tw`flex-1`}>
        <View style={tw`p-6`}>
          <OnboardingHeader
            title={t('selectOrganization.title')}
            subTitle={t('selectOrganization.subTitle')}
            icon={<MerchantIcon />}
          />
        </View>

        <View style={tw`flex-1 mt-5 mx-3`}>
          <OrganizationCard
            companyName="Company Name"
            isSelected
            onPress={() => {}}
            memberSinceDate="Jul 2019"
          />
          <OrganizationCard
            companyName="Company Name"
            isSelected={false}
            onPress={() => {}}
            memberSinceDate="Jul 2019"
          />
        </View>

        <View style={tw`p-6`}>
          <Button
            containerStyle={tw`flex w-full h-16`}
            textStyle={tw`text-primaryLight`}
            onPress={handleSubmit}
          >
            {t('selectOrganization.buttonCta')}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectOrganizationScreen;
