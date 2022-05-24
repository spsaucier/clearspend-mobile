import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const HandStopIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M11.5862 9.75V4.875C11.5862 4.37772 11.7769 3.90081 12.1164 3.54917C12.4559 3.19754 12.9164 3 13.3965 3C13.8767 3 14.3371 3.19754 14.6766 3.54917C15.0161 3.90081 15.2069 4.37772 15.2069 4.875V12.375"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.96558 10.5V3.375C7.96558 2.87772 8.15631 2.40081 8.49581 2.04917C8.83532 1.69754 9.29579 1.5 9.77592 1.5C10.2561 1.5 10.7165 1.69754 11.056 2.04917C11.3955 2.40081 11.5863 2.87772 11.5863 3.375V9.75"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.5861 16.125C11.5861 15.1304 11.9676 14.1766 12.6466 13.4733C13.3256 12.7701 14.2465 12.375 15.2068 12.375V10.5C15.2068 10.0027 15.3975 9.52581 15.737 9.17417C16.0765 8.82254 16.537 8.625 17.0171 8.625C17.4973 8.625 17.9577 8.82254 18.2972 9.17417C18.6368 9.52581 18.8275 10.0027 18.8275 10.5V14.25C18.8275 16.2391 18.0646 18.1468 16.7065 19.5533C15.3485 20.9598 13.5066 21.75 11.5861 21.75C9.66557 21.75 7.8237 20.9598 6.46568 19.5533C5.10766 18.1468 4.34473 16.2391 4.34473 14.25V6.375C4.34473 5.87772 4.53546 5.40081 4.87496 5.04917C5.21447 4.69754 5.67494 4.5 6.15507 4.5C6.6352 4.5 7.09567 4.69754 7.43518 5.04917C7.77468 5.40081 7.96542 5.87772 7.96542 6.375V10.5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
