import React, { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withSpring,
} from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import tw from '@/Styles/tailwind';

const secondaryColor = tw.color('secondary');
const lightGray = tw.color('gray-20');

export const ToggleSwitch = ({
  toggleSwitch,
  value = false,
  disable = false,
}: {
  toggleSwitch: (value: boolean) => void;
  value: boolean;
  disable?: boolean;
}) => {
  const animationValue = useSharedValue<boolean>(value);
  const containerWidth = 40;
  const knobWidth = 16;

  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: animationValue.value ? secondaryColor : 'white',
    }),
    [animationValue.value],
  );

  const animatedStyle2 = useAnimatedStyle(
    () => ({
      backgroundColor: animationValue.value ? 'white' : lightGray,
      transform: [
        {
          translateX: withSpring(
            interpolate(animationValue.value ? 1 : 0, [0, 1], [2, containerWidth - knobWidth - 2]),
            { damping: 15 },
          ),
        },
      ],
    }),
    [animationValue.value],
  );

  useEffect(() => {
    animationValue.value = value;
  }, [animationValue, value]);

  return (
    <Animated.View style={[tw`rounded-xl`, animatedStyle]}>
      <TouchableWithoutFeedback
        disabled={disable}
        style={[tw`relative h-5 justify-center`, { minWidth: containerWidth }]}
        onPress={() => {
          const newValue = !animationValue.value;
          animationValue.value = newValue;
          toggleSwitch(newValue);
        }}
      >
        <Animated.View
          style={[tw`rounded-xl`, { height: knobWidth, width: knobWidth }, animatedStyle2]}
        />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};
