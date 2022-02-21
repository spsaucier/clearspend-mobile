import React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { ProfileSettingsHeader } from '@/Containers/Profile/Components/ProfileSettingHeader';
import { FocusAwareStatusBar } from '@/Components';
import { MainScreens } from '@/Navigators/NavigatorTypes';
import { ProfileMenuRow } from './Components/ProfileMenuRow';
import { UserIcon } from '@/Components/Icons';
import { useUser } from '@/Queries';
import { formatPhone } from '@/Helpers/StringHelpers';
import { validRecoveryCode } from './UpdateMobileScreen';
import { useSensitiveInfo } from '@/Hooks/useSensitiveInfo';
import { RECOVERY_CODE_KEY } from '@/Store/keys';
import { store } from '@/Store';

const UpdateAccountScreen = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { isLoading, data: user } = useUser();
  const { data: recoveryCode, loading: recoveryCodeLoading } = useSensitiveInfo(RECOVERY_CODE_KEY);
  const methodId = store.getState().session?.twoFactor?.methods?.[0].id;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={tw`flex-1 p-5 justify-between`} behavior="padding">
        <View>
          <ProfileSettingsHeader
            icon={<UserIcon size={32} />}
            title={t('profile.updateAccount.title')}
          />
          {!isLoading && user ? (
            <View style={tw`mt-5`}>
              {
                // eslint-disable-next-line no-constant-condition
                !recoveryCodeLoading &&
                !isLoading &&
                user?.userId &&
                methodId &&
                validRecoveryCode(recoveryCode, user.userId) &&
                false ? (
                  <View style={tw`mb-3`}>
                    <ProfileMenuRow
                      title={t('profile.updateAccount.updatePhone')}
                      label={formatPhone(user?.phone || '')}
                      onPress={() => {
                        navigate(MainScreens.UpdateMobile);
                      }}
                    />
                  </View>
                ) : null
              }
              <View style={tw`mb-3`}>
                <ProfileMenuRow
                  title={t('profile.updateAccount.updateAddress')}
                  label={
                    user.address?.streetLine1
                      ? `${user.address?.streetLine1}, ${
                          user.address?.streetLine2 ? `${user.address?.streetLine2}, ` : ''
                        }${user.address?.locality}, ${user.address?.region} ${
                          user.address?.postalCode
                        }` || ''
                      : undefined
                  }
                  onPress={() => {
                    navigate(MainScreens.UpdateAddress);
                  }}
                />
              </View>
            </View>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UpdateAccountScreen;
