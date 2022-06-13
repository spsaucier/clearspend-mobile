import React, { FC, useEffect, useState } from 'react';
import { View, TouchableOpacity, BackHandler } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import tw from '@/Styles/tailwind';
import { CSText, FocusAwareStatusBar, Button } from '@/Components';
import { CloseCircleIcon } from '@/Components/Icons';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import ExitConfirmationModal from './ExitConfirmationModal';

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
  hideCloseButton?: boolean;
  edges?: Edge[];
  onClose?: () => void;
  warningExitOnGoBack?: boolean;
  processing?: boolean;
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
  hideCloseButton,
  edges = ['top', 'bottom'],
  onClose,
  warningExitOnGoBack = false,
  processing,
}) => {
  const { t } = useTranslation();
  const [askExitConfirmation, setAskExitConfirmation] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isFocused) {
        if (warningExitOnGoBack) {
          setAskExitConfirmation(true);
          return true;
        }
        return false;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [isFocused, warningExitOnGoBack]);

  return (
    <SafeAreaView testID={testID} style={tw`flex-1 bg-white`} edges={edges}>
      <FocusAwareStatusBar backgroundColor={tw.color('white')} barStyle="dark-content" />

      <View
        style={[
          tw`flex-row items-center justify-between p-5`,
          hideBackButton ? tw`justify-end` : null,
        ]}
      >
        {!hideBackButton ? (
          <BackButtonNavigator
            theme="light"
            onBackPress={() => {
              if (warningExitOnGoBack) {
                setAskExitConfirmation(true);
              } else navigation.goBack();
            }}
          />
        ) : null}
        {!hideCloseButton && onClose ? (
          <TouchableOpacity
            style={tw`self-end`}
            onPress={() => {
              setAskExitConfirmation(true);
            }}
          >
            <CloseCircleIcon />
          </TouchableOpacity>
        ) : null}
      </View>

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
          <View
            style={tw.style(
              `mt-auto pt-5`,
              onSecondaryAction && onSecondaryActionLabel ? 'pb-2' : 'pb-5',
            )}
          >
            <Button
              testID="primary-action-button"
              label={onPrimaryActionLabel || t('adminFlows.nextStepCta')}
              onPress={onPrimaryAction}
              disabled={primaryActionDisabled}
              loading={processing}
            />
            {onSecondaryAction && onSecondaryActionLabel && (
              <Button
                testID="secondary-action-button"
                containerStyle={tw`bg-white mt-2`}
                label={onSecondaryActionLabel}
                onPress={onSecondaryAction}
              />
            )}
          </View>
        )}
      </View>

      {askExitConfirmation && onClose ? (
        <ExitConfirmationModal
          onPrimaryAction={onClose}
          onSecondaryAction={() => {
            setAskExitConfirmation(false);
          }}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default AdminScreenWrapper;
