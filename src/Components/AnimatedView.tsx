import React from 'react';
import { View, ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';

/* eslint-disable */
/* This file exists because to reanimated createAnimatedComponent method only works with class components. https://github.com/software-mansion/react-native-reanimated/discussions/1527
The eslint exception above has been added as the project lint setup does not allow class component. */
class AnimatedViewComponent extends React.Component<ViewProps> {
  render() {
    return <View {...this.props}>{this.props.children}</View>;
  }
}

export const AnimatedView = Animated.createAnimatedComponent(AnimatedViewComponent);
