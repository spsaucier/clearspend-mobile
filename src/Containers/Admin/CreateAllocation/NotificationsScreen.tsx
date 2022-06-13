import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import CurrencyInput from 'react-native-currency-input';

import {
  AdminScreens,
  AdminStackParamTypes,
  CreateAllocationScreens,
  CreateAllocationStackParamTypes,
} from '@/Navigators/Admin/AdminNavigatorTypes';
import AdminScreenWrapper from '../Components/AdminScreenWrapper';
import tw from '@/Styles/tailwind';
import { CSText, LetterAvatar, ToggleSwitch } from '@/Components';
import { useNewAllocationContext } from '@/Hooks/useNewAllocationContext';
import { User } from '@/generated/capital';

const NotificationsScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<CreateAllocationStackParamTypes & AdminStackParamTypes>
    >();
  const {
    selectedManagers,
    selectedViewers,
    lowBalanceNotificationSettings,
    setLowBalanceNotificationSettings,
  } = useNewAllocationContext();

  const {
    enabled: lowBalanceNotificationEnabled,
    amount,
    managersEnabled,
    viewersEnabled,
  } = lowBalanceNotificationSettings;

  const onToggleSwitch = (enabled: boolean) => {
    setLowBalanceNotificationSettings({
      ...lowBalanceNotificationSettings,
      enabled,
      amount: !enabled ? 0 : amount,
    });
  };

  const onAmountChange = (value: number) => {
    setLowBalanceNotificationSettings({
      ...lowBalanceNotificationSettings,
      amount: value,
    });
  };

  const onManagerToggle = (user: User, enabled: boolean) => {
    let { managersEnabled: localManagersEnabledList } = lowBalanceNotificationSettings;

    if (!localManagersEnabledList.find((x) => x === user.userId) && enabled) {
      localManagersEnabledList.push(user.userId!);
    } else {
      localManagersEnabledList = localManagersEnabledList.filter((x) => x !== user.userId);
    }

    setLowBalanceNotificationSettings({
      ...lowBalanceNotificationSettings,
      managersEnabled: localManagersEnabledList,
    });
  };

  const onAllManagersToggle = (enabled: boolean) => {
    const newEnableList = enabled ? selectedManagers!.map((x) => x.userId!) : [];

    setLowBalanceNotificationSettings({
      ...lowBalanceNotificationSettings,
      managersEnabled: newEnableList,
    });
  };

  const onViewersToggle = (user: User, enabled: boolean) => {
    let { viewersEnabled: localViewersEnabledList } = lowBalanceNotificationSettings;

    if (!localViewersEnabledList.find((x) => x === user.userId) && enabled) {
      localViewersEnabledList.push(user.userId!);
    } else {
      localViewersEnabledList = localViewersEnabledList.filter((x) => x !== user.userId);
    }

    setLowBalanceNotificationSettings({
      ...lowBalanceNotificationSettings,
      viewersEnabled: localViewersEnabledList,
    });
  };

  const onAllViewersToggle = (enabled: boolean) => {
    const newEnableList = enabled ? selectedViewers!.map((x) => x.userId!) : [];

    setLowBalanceNotificationSettings({
      ...lowBalanceNotificationSettings,
      viewersEnabled: newEnableList,
    });
  };

  return (
    <AdminScreenWrapper
      title={t('adminFlows.createAllocation.notifications.title')}
      text={t('adminFlows.createAllocation.notifications.description')}
      onPrimaryAction={() => navigate(CreateAllocationScreens.ConfirmDetails)}
      onClose={() => navigate(AdminScreens.Allocations)}
    >
      <ScrollView
        style={tw`flex-1`}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`bg-tan`}>
          <View style={tw`w-full p-4 flex-row justify-between rounded `}>
            <CSText>{t('adminFlows.createAllocation.notifications.lowBalance')}</CSText>
            <ToggleSwitch value={lowBalanceNotificationEnabled} toggleSwitch={onToggleSwitch} />
          </View>
          {lowBalanceNotificationEnabled ? (
            <View style={tw`m-3 p-3 flex-row bg-white justify-between items-center rounded`}>
              <CSText>{t('adminFlows.createAllocation.notifications.amount')}</CSText>
              <CurrencyInput
                value={amount || 0}
                prefix="$"
                style={tw`border border-1 p-1 border-gray-10 text-base font-telegraf text-right w-30 items-center`}
                onChangeValue={(value) => {
                  onAmountChange(value!);
                }}
              />
            </View>
          ) : null}
        </View>

        {lowBalanceNotificationEnabled ? (
          <View style={tw`mt-4`}>
            {selectedManagers?.length === 1 ? (
              <CSText>{t('adminFlows.createAllocation.notifications.manager')}</CSText>
            ) : (
              <>
                <CSText>{t('adminFlows.createAllocation.notifications.managers')}</CSText>
                <View style={tw`bg-tan mt-2 rounded flex-row justify-between p-3`}>
                  <CSText>{t('adminFlows.createAllocation.notifications.allManagers')}</CSText>

                  <ToggleSwitch
                    value={selectedManagers!.every((x) =>
                      managersEnabled.some((y) => y === x.userId),
                    )}
                    toggleSwitch={(enabled) => {
                      onAllManagersToggle(enabled);
                    }}
                  />
                </View>
              </>
            )}

            <View style={tw`bg-tan mt-2 rounded p-3`}>
              {selectedManagers?.map((item) => (
                <View
                  key={item.userId}
                  style={tw`flex-row items-center justify-between flex-1 py-1`}
                >
                  <View style={tw`flex-row items-center p-1`}>
                    <LetterAvatar
                      size={28}
                      initials={`${item.firstName![0]}${item.lastName![0]}`}
                    />
                    <CSText style={tw`ml-2`}>{`${item.firstName} ${item.lastName}`}</CSText>
                  </View>
                  <ToggleSwitch
                    value={managersEnabled.includes(item.userId!)}
                    toggleSwitch={(enabled) => {
                      onManagerToggle(item, enabled);
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {lowBalanceNotificationEnabled ? (
          <View style={tw`mt-4`}>
            {selectedViewers?.length === 1 ? (
              <CSText>{t('adminFlows.createAllocation.notifications.viewer')}</CSText>
            ) : (
              <>
                <CSText>{t('adminFlows.createAllocation.notifications.viewers')}</CSText>
                <View style={tw`bg-tan mt-2 rounded flex-row justify-between p-3`}>
                  <CSText>{t('adminFlows.createAllocation.notifications.allViewers')}</CSText>

                  <ToggleSwitch
                    value={selectedViewers!.every((x) =>
                      viewersEnabled.some((y) => y === x.userId),
                    )}
                    toggleSwitch={(enabled) => {
                      onAllViewersToggle(enabled);
                    }}
                  />
                </View>
              </>
            )}

            <View style={tw`bg-tan mt-2 rounded p-3`}>
              {selectedViewers?.map((item) => (
                <View
                  key={item.userId}
                  style={tw`flex-row items-center justify-between flex-1 py-2`}
                >
                  <View style={tw`flex-row flex-1 items-center`}>
                    <LetterAvatar
                      size={28}
                      initials={`${item.firstName![0]}${item.lastName![0]}`}
                    />
                    <CSText
                      style={tw`ml-2`}
                      numberOfLines={1}
                    >{`${item.firstName} ${item.lastName}`}</CSText>
                  </View>
                  <ToggleSwitch
                    value={viewersEnabled.includes(item.userId!)}
                    toggleSwitch={(enabled) => {
                      onViewersToggle(item, enabled);
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </AdminScreenWrapper>
  );
};

export default NotificationsScreen;
