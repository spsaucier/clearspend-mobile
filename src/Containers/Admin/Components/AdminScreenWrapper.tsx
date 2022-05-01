import React, { FC } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { CSText, FocusAwareStatusBar, Button } from '@/Components';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';

interface Props {
  title?: string;
  text?: string;
  onPrimaryAction?: () => void;
  onPrimaryActionLabel?: string;
  onSecondaryAction?: () => void;
  onSecondaryActionLabel?: string;
  hideBackButton?: boolean;
}

const AdminScreenWrapper: FC<Props> = ({
  children,
  title,
  text,
  onPrimaryAction,
  onPrimaryActionLabel,
  onSecondaryAction,
  onSecondaryActionLabel,
  hideBackButton,
}) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['top', 'bottom']}>
      <FocusAwareStatusBar backgroundColor={tw.color('white')} barStyle="dark-content" />
      {!hideBackButton && (
        <View style={tw`p-5`}>
          <BackButtonNavigator theme="light" />
        </View>
      )}
      <ScrollView>
        <View style={tw`px-5`}>
          <View style={tw`mt-3 mb-8`}>
            {title && (
              <CSText style={tw`font-telegraf text-2xl font-light text-black`}>{title}</CSText>
            )}
            {text && <CSText style={tw`text-sm leading-normal text-gray-75 mt-2`}>{text}</CSText>}
          </View>
          <View style={tw`px-5`}>{children}</View>
        </View>
      </ScrollView>
      <View style={tw`p-5`}>
        {onPrimaryAction && (
          <Button
            label={onPrimaryActionLabel || t('adminFlows.nextStepCta')}
            onPress={onPrimaryAction}
          />
        )}
        {onSecondaryAction && onSecondaryActionLabel && (
          <Button
            containerStyle={tw`bg-white mt-2`}
            label={onSecondaryActionLabel}
            onPress={onSecondaryAction}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AdminScreenWrapper;
