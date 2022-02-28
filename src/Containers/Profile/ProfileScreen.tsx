import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import tw from '@/Styles/tailwind';
import { ProfileMenuRow } from '@/Containers/Profile/Components/ProfileMenuRow';
import { CSText, FocusAwareStatusBar, ActivityIndicator } from '@/Components';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { useAuthentication } from '@/Hooks/useAuthentication';
import { useUser } from '@/Queries';
import { EmailIcon, PhoneIcon } from '@/Components/Icons';
import { AddressDisplay } from './Components/AddressDisplay';
import { formatPhone } from '@/Helpers/StringHelpers';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';

const ProfileScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const { isLoading, error, data: user } = useUser();
  const { logout } = useAuthentication();

  return (
    <SafeAreaView style={tw`flex-1 bg-secondary`} edges={['top']}>
      <FocusAwareStatusBar backgroundColor={tw.color('secondary')} barStyle="light-content" />
      <View style={tw`p-5`}>
        <BackButtonNavigator theme="dark" />
      </View>
      <View style={[tw`h-1/3 flex-col justify-center bg-secondary px-5 pt-12 pb-16`]}>
        {isLoading || error || !user ? (
          <ActivityIndicator />
        ) : (
          <>
            <CSText style={tw`text-3xl font-montreal font-light text-white mb-5`}>
              {`${user.firstName} ${user.lastName}`}
            </CSText>
            <View style={tw`flex-row mb-3`}>
              <EmailIcon size={20} />
              <CSText style={tw`text-white text-sm ml-3 leading-5`}>{user.email}</CSText>
            </View>
            <View style={tw`flex-row mb-3`}>
              <PhoneIcon size={20} />
              <CSText style={tw`text-white text-sm ml-3 leading-5`}>
                {formatPhone(user.phone)}
              </CSText>
            </View>
            <AddressDisplay address={user.address || {}} />
          </>
        )}
      </View>
      <View style={tw`px-6 flex-1 justify-between`}>
        {/* Bottom white area */}
        <View style={tw`bg-white rounded-1`}>
          <ProfileMenuRow
            title={t('profile.profileMenu.updatePersonalDetails')}
            onPress={() => {
              navigate(MainScreens.UpdateAccount);
            }}
            style={tw`h-14 px-4`}
            showBottomBorder
          />
          <ProfileMenuRow
            title={t('profile.profileMenu.loginOptions')}
            onPress={() => {
              navigate(MainScreens.LoginOptions);
            }}
            style={tw`h-14 px-4`}
            showBottomBorder
          />
          <ProfileMenuRow
            title={t('profile.profileMenu.activateCard')}
            onPress={() => {
              navigate(MainScreens.ActivateCard);
            }}
            style={tw`h-14 px-4`}
            showBottomBorder
          />
          <ProfileMenuRow
            title={t('profile.legalDocs.title')}
            onPress={() => {
              navigate(MainScreens.LegalDocuments);
            }}
            style={tw`h-14 px-4`}
          />
        </View>
        <TouchableOpacity onPress={logout} style={tw`flex-row justify-center mb-10`}>
          <CSText style={tw`text-primary py-3`}>{t('profile.profileMenu.logOut')}</CSText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
