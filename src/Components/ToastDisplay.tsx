import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import tw from '@/Styles/tailwind';
import { CSText } from '@/Components/Text';
import { CheckCircleIconFilled, ExclamationIcon } from './Icons';

type ToastProps = {
  text1?: string;
  props: { dark: boolean; onPress?: () => void };
};

type ToastType = 'success' | 'info' | 'error';

const CustomToast = ({
  text1,
  props: { dark, onPress },
  type,
}: ToastProps & { type: ToastType }) => (
  <TouchableOpacity
    style={tw`absolute top-0 flex rounded-1 w-full justify-center mt-2 border-black w-90 shadow-lg bg-${
      dark ? 'secondary' : 'white'
    }`}
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={tw`flex-row items-center p-3.5`}>
      <View style={tw`mr-2`}>
        {type === 'success' ? (
          <CheckCircleIconFilled
            color={dark ? tw.color('secondary') : tw.color('primary')}
            bgColor={dark ? tw.color('primary') : tw.color('black')}
          />
        ) : type === 'info' ? (
          <ExclamationIcon
            size={24}
            color={dark ? tw.color('secondary') : 'white'}
            bgColor={dark ? 'white' : tw.color('secondary')}
          />
        ) : type === 'error' ? (
          <ExclamationIcon
            size={24}
            color="white"
            bgColor={dark ? tw.color('darkError') : tw.color('error')}
          />
        ) : null}
      </View>
      <CSText style={tw`flex-1 text-xs text-${dark ? 'white' : 'secondary'}`}>{text1}</CSText>
    </View>
  </TouchableOpacity>
);

const toastConfig: ToastConfig = {
  success: (props: ToastProps) => <CustomToast {...props} type="success" />,
  error: (props: ToastProps) => <CustomToast {...props} type="error" />,
  info: (props: ToastProps) => <CustomToast {...props} type="info" />,
};

/**
 * Needs to be rendered at the app root, and again inside any screens presented as modals on iOS only, see:
 * https://github.com/calintamas/react-native-toast-message/blob/main/docs/modal-usage.md#notes-regarding-react-native-modal-or-nativestacknavigator
 */
export const ToastDisplay = () => {
  const insets = useSafeAreaInsets();

  return <Toast config={toastConfig} topOffset={insets.top} bottomOffset={insets.bottom} />;
};
