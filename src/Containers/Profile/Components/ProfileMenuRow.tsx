import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import tw from '@/Styles/tailwind';
import { ChevronIconThin } from '@/Components/Icons';
import { CSText } from '@/Components';

type Props = {
  testID?: string;
  label?: string;
  title?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  showBottomBorder?: boolean;
  borderColor?: string;
};

export const ProfileMenuRow = ({
  testID,
  label,
  title,
  onPress,
  style,
  titleStyle,
  labelStyle,
  showBottomBorder = false,
  borderColor = 'border-gray-10',
}: Props) => (
  <>
    <TouchableOpacity
      testID={testID}
      style={[
        tw.style('flex-row justify-between py-2', label ? 'items-start' : 'items-center'),
        style,
      ]}
      onPress={onPress}
    >
      <View>
        {title ? (
          <CSText style={[tw.style('text-base', label ? 'mb-2' : ''), titleStyle]}>{title}</CSText>
        ) : null}
        {label ? (
          <CSText style={[tw.style('text-sm', title ? 'text-gray-75' : ''), labelStyle]}>
            {label}
          </CSText>
        ) : null}
      </View>
      <ChevronIconThin />
    </TouchableOpacity>
    {showBottomBorder ? <View style={tw.style('border-b-1', borderColor)} /> : null}
  </>
);
