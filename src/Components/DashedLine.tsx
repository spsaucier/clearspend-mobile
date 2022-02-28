import React, { useMemo, useState } from 'react';
import { View, ViewStyle } from 'react-native';
import tw from '@/Styles/tailwind';

type Props = {
  vertical?: boolean;
  dashGap?: number;
  dashLength?: number;
  dashThickness?: number;
  dashColor?: string;
  dashStyle?: ViewStyle;
  style?: ViewStyle;
};

export const DashedLine = ({
  vertical = false,
  dashGap = 3,
  dashLength = 6,
  dashThickness = 1,
  dashColor = tw.color('black-20'),
  dashStyle = {},
  style = {},
}: Props) => {
  const [lineLength, setLineLength] = useState(0);
  const isHorizontal = !vertical;
  const numOfDashes = Math.ceil(lineLength / (dashGap + dashLength));

  const dashStyles = useMemo(
    () => ({
      width: isHorizontal ? dashLength : dashThickness,
      height: isHorizontal ? dashThickness : dashLength,
      marginRight: isHorizontal ? dashGap : 0,
      marginBottom: isHorizontal ? 0 : dashGap,
      backgroundColor: dashColor,
    }),
    [dashColor, dashGap, dashLength, dashThickness, isHorizontal],
  );

  const dashes = [];
  for (let i = 0; i < numOfDashes; i += 1) {
    dashes.push(<View key={i} style={[dashStyles, dashStyle]} />);
  }

  return (
    <View
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setLineLength(isHorizontal ? width : height);
      }}
      style={[tw.style(isHorizontal ? 'flex-row' : 'flex-col'), style]}
    >
      {dashes}
    </View>
  );
};
