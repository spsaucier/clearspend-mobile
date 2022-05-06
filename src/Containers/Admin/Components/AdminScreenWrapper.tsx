import React, { FC } from 'react';
import { View } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { CSText, FocusAwareStatusBar, Button } from '@/Components';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';

interface Props {
  testID?: string;
  title?: string;
  text?: string;
  onPrimaryAction?: () => void;
  onPrimaryActionLabel?: string;
  primaryActionDisabled?: boolean;
  onSecondaryAction?: () => void;
  onSecondaryActionLabel?: string;
  hideBackButton?: boolean;
  edges?: Edge[];
}

const AdminScreenWrapper: FC<Props> = ({
  children,
  testID,
  title,
  text,
  onPrimaryAction,
  onPrimaryActionLabel,
  primaryActionDisabled,
  onSecondaryAction,
  onSecondaryActionLabel,
  hideBackButton,
  edges = ['top', 'bottom'],
}) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView testID={testID} style={tw`flex-1 bg-white`} edges={edges}>
      <FocusAwareStatusBar backgroundColor={tw.color('white')} barStyle="dark-content" />
      {!hideBackButton && (
        <View style={tw`p-5`}>
          <BackButtonNavigator theme="light" />
        </View>
      )}
      {title && (
        <View style={tw`px-5`}>
          <View style={tw`mt-3 mb-8`}>
            {title && (
              <CSText style={tw`font-telegraf text-2xl font-light text-black`}>{title}</CSText>
            )}
            {text && <CSText style={tw`text-sm leading-normal text-gray-75 mt-2`}>{text}</CSText>}
          </View>
        </View>
      )}
      <View style={tw`flex-1 px-5`}>
        {children}
        {onPrimaryAction && (
          <View style={tw`mt-auto py-5`}>
            <Button
              testID="primary-action-button"
              label={onPrimaryActionLabel || t('adminFlows.nextStepCta')}
              onPress={onPrimaryAction}
              disabled={primaryActionDisabled}
            />
            {onSecondaryAction && onSecondaryActionLabel && (
              <Button
                containerStyle={tw`bg-white mt-2`}
                label={onSecondaryActionLabel}
                onPress={onSecondaryAction}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AdminScreenWrapper;
