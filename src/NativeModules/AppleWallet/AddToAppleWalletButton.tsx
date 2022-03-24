import React from 'react';
import {
  HostComponent,
  requireNativeComponent,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import tw from '@/Styles/tailwind';

type NativeComponentProps = {
  style: StyleProp<ViewStyle>;
};

type WrapperProps = {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
};

const NativeAddToAppleWalletButton: HostComponent<NativeComponentProps> = requireNativeComponent(
  'RCTAppleAddToWalletButtonView',
);

class AddToAppleWalletButton extends React.PureComponent<WrapperProps> {
  render() {
    const { onPress, style } = this.props;

    return (
      <TouchableOpacity style={tw`items-center`} onPress={onPress}>
        <NativeAddToAppleWalletButton style={style} />
      </TouchableOpacity>
    );
  }
}

export default AddToAppleWalletButton;
