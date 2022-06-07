import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import tw from '@/Styles/tailwind';
import { CSText as Text, Button } from '@/Components';

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
}

const Modal = ({
  testID,
  title,
  text,
  onPrimaryAction,
  onPrimaryActionLabel = 'Accept',
  onSecondaryAction,
  onSecondaryActionLabel = 'Cancel',
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
        {onPrimaryAction && <Button label={onPrimaryActionLabel} onPress={onPrimaryAction} />}
        {onSecondaryAction && (
          <Button
            containerStyle={tw`bg-transparent mt-1`}
            textStyle={tw`text-white`}
            label={onSecondaryActionLabel}
            onPress={onSecondaryAction}
          />
        )}
      </View>
    </View>
  </Animated.View>
);

export default Modal;
