import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, Linking, View } from 'react-native';
import tw from '@/Styles/tailwind';
import { ProfileSettingsHeader } from '@/Containers/Profile/Components/ProfileSettingHeader';
import { FocusAwareStatusBar } from '@/Components';
import { LegalIcon } from '@/Components/Icons';
import { ProfileMenuRow } from './Components/ProfileMenuRow';

const LegalDocumentsScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={tw`flex-1 p-5 justify-between`} behavior="padding">
        <View>
          <ProfileSettingsHeader
            icon={<LegalIcon size={32} />}
            title={t('profile.legalDocs.title')}
          />
          <View style={tw`mt-5`}>
            <View style={tw`mb-3`}>
              <ProfileMenuRow
                title={t('profile.legalDocs.terms')}
                onPress={() => {
                  Linking.openURL('https://www.clearspend.com/terms-and-conditions').catch(
                    (err) => {
                      // eslint-disable-next-line no-console
                      console.error('Failed to open ClearSpend website: ', err);
                    },
                  );
                }}
              />
            </View>
            <View style={tw`mb-3`}>
              <ProfileMenuRow
                title={t('profile.legalDocs.privacy')}
                onPress={() => {
                  Linking.openURL('https://www.clearspend.com/privacy-policy').catch((err) => {
                    // eslint-disable-next-line no-console
                    console.error('Failed to open ClearSpend website: ', err);
                  });
                }}
              />
            </View>
            {/* <View style={tw`mb-3`}>
              <ProfileMenuRow
                title={t('profile.legalDocs.cardholder')}
                onPress={() => {
                  Linking.openURL('https://www.clearspend.com/terms-and-conditions').catch((err) => {
                    // eslint-disable-next-line no-console
                    console.error('Failed to open ClearSpend website: ', err);
                  });
                }}
              />
            </View> */}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LegalDocumentsScreen;
