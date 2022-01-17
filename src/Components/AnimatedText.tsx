import React from 'react';
import Animated from 'react-native-reanimated';
import { CSText } from '.';
import { CSTextProps } from './Text';

class AnimatedCSTextComponent extends React.Component<CSTextProps> {
  constructor(props: CSTextProps) {
    super(props);
  }
  render() {
    return <CSText {...this.props}>{this.props.children}</CSText>;
  }
}

export const AnimatedCSText = Animated.createAnimatedComponent(AnimatedCSTextComponent);
