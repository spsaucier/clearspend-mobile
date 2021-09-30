import { useEffect } from 'react';
import { Animated, Easing } from 'react-native';

export const useRotateAnimation = (running: boolean = true, duration: number = 1000) => {
  const animation = new Animated.Value(0);

  const loop = Animated.loop(
    Animated.timing(animation, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
      isInteraction: false,
    }),
  );
  const interpolatedRotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    if (running) {
      loop.start();
    } else {
      animation.setValue(0);
      loop.stop();
    }

    return () => loop.stop();
  }, [running, loop, animation]);

  return [interpolatedRotate];
};
