import React from 'react';
import Animated from 'react-native-reanimated';
import { CSText, CSTextProps } from './Text';

/* eslint-disable */
/* This file exists because to reanimated createAnimatedComponent method only works with class components. https://github.com/software-mansion/react-native-reanimated/discussions/1527
The eslint exception above has been added as the project lint setup does not allow class component. */
class AnimatedCSTextComponent extends React.Component<CSTextProps> {
  render() {
    return <CSText {...this.props}>{this.props.children}</CSText>;
  }
}

export const AnimatedCSText = Animated.createAnimatedComponent(AnimatedCSTextComponent);
