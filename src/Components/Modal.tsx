import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import tw from '@/Styles/tailwind';
import { CSText as Text, Button } from '@/Components';
import { CloseIcon } from './Icons';
import { CSText } from './Text';

const FADE_IN_DURATION = 250;
const FADE_OUT_DURATION = 150;

interface ModalProps {
  testID?: string;
  title?: string;
  text?: string;
  onPrimaryAction?: () => void;
  onPrimaryActionLabel?: string;
  onSecondaryAction?: () => void;
  onSecondaryActionLabel?: string;
  danger?: boolean;
}

const Modal = ({
  testID,
  title,
  text,
  onPrimaryAction,
  onPrimaryActionLabel = 'Accept',
  onSecondaryAction,
  onSecondaryActionLabel = 'Cancel',
  danger = false,
}: ModalProps) => (
  <Animated.View
    testID={testID}
    entering={FadeIn.duration(FADE_IN_DURATION)}
    exiting={FadeOut.duration(FADE_OUT_DURATION)}
    style={tw`absolute justify-center inset-0`}
  >
    <View style={tw`absolute inset-0 bg-black opacity-80`} />
    <View style={tw`px-5`}>
      {title ? <Text style={tw`text-2xl font-telegraf text-white`}>{title}</Text> : null}
      {text ? <Text style={tw`text-sm text-white mt-4 leading-normal`}>{text}</Text> : null}
      <View style={tw`mt-10`}>
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
  </Animated.View>
);

export default Modal;
