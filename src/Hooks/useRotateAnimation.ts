import { useEffect, useMemo } from 'react';
import { Animated, Easing } from 'react-native';

export const useRotateAnimation = (duration: number = 1000) => {
  const animation = useMemo(() => new Animated.Value(0), []);

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
    loop.start();
    return () => loop.stop();
    // avoided adding loop in the dependency array as we dont want to see the animation
    // restarting everytime the state of the screen changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [interpolatedRotate];
};
