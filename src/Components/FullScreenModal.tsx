import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import tw from '@/Styles/tailwind';
import { Button } from './Button';
import { CloseIcon } from './Icons';
import { CSText } from './Text';
import { FocusAwareStatusBar } from './FocusAwareStatusbar';

interface FullScreenModalProps {
  visible: boolean;
  testID?: string;
  title?: string;
  text?: string;
  onPrimaryAction?: () => void;
  onPrimaryActionLabel?: string;
  onSecondaryAction?: () => void;
  onSecondaryActionLabel?: string;
  danger?: boolean;
}

const FullScreenModal = ({
  visible,
  testID,
  title,
  text,
  onPrimaryAction,
  onPrimaryActionLabel = 'Accept',
  onSecondaryAction,
  onSecondaryActionLabel = 'Cancel',
  danger = false,
}: FullScreenModalProps) => (
  <Modal
    testID={testID}
    transparent
    visible={visible}
    presentationStyle="overFullScreen"
    hardwareAccelerated
    statusBarTranslucent
    onRequestClose={() => {
      if (onSecondaryAction) onSecondaryAction();
    }}
  >
    <View
      style={[
        tw`flex-1 items-center justify-center inset-0 `,
        { backgroundColor: 'rgba(0,0,0,0.8)' },
      ]}
    >
      <FocusAwareStatusBar barStyle="light-content" />
      <View>
        {title ? <CSText style={tw`text-2xl font-telegraf text-white`}>{title}</CSText> : null}
        {text ? <CSText style={tw`text-sm text-white mt-4 leading-normal`}>{text}</CSText> : null}
        <View style={tw`mt-10 items-center`}>
          {onPrimaryAction && (
            <Button
              label={onPrimaryActionLabel}
              onPress={onPrimaryAction}
              containerStyle={danger ? tw`bg-error` : null}
              textStyle={danger ? tw`text-white` : null}
            />
          )}
          {onSecondaryAction && (
            <TouchableOpacity
              style={tw`flex-row items-center justify-center pt-5`}
              onPress={onSecondaryAction}
            >
              <View
                style={tw`rounded-full border-white border-1 w-7 h-7 items-center justify-center mr-1`}
              >
                <CloseIcon color={tw.color('white')} />
              </View>
              <CSText style={tw`text-white ml-1`}>{onSecondaryActionLabel}</CSText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  </Modal>
);

export default FullScreenModal;
