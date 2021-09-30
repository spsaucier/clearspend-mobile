import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';

type Props = {
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const Logo = ({ color = tw.color('white'), style, testID }: Props) => (
  <View style={[{ aspectRatio: 140 / 29 }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 140 29" fill="none">
      <Path
        d="M2.60444 0.467986H7.54251V7.74801H10.4836V12.0144H7.54251V27.5003H2.60444V12.0144H0.0627899V7.74801H2.60444V0.467986Z"
        fill={color}
      />
      <Path
        d="M11.9904 7.74801H16.2386V10.2352C16.6985 9.25484 17.3097 8.5105 18.0722 8.00217C18.8347 7.49384 19.6698 7.23968 20.5776 7.23968C21.219 7.23968 21.8908 7.40912 22.5927 7.74801L21.0496 12.0144C20.4686 11.7239 19.9906 11.5786 19.6154 11.5786C18.8529 11.5786 18.2054 12.0507 17.6728 12.9947C17.1524 13.9387 16.8922 15.7905 16.8922 18.55L16.9103 19.5122V27.5003H11.9904V7.74801Z"
        fill={color}
      />
      <Path
        d="M39.6581 7.74801H44.5962V27.5003H39.6581V25.4125C38.6899 26.3323 37.7156 26.998 36.7352 27.4095C35.767 27.8089 34.714 28.0086 33.5763 28.0086C31.0225 28.0086 28.8137 27.0222 26.9499 25.0494C25.086 23.0645 24.154 20.6015 24.154 17.6605C24.154 14.6105 25.0557 12.1112 26.8591 10.1626C28.6624 8.21398 30.8531 7.23968 33.4311 7.23968C34.6172 7.23968 35.7307 7.46358 36.7715 7.9114C37.8124 8.35921 38.7746 9.03094 39.6581 9.92657V7.74801ZM34.4477 11.8147C32.9106 11.8147 31.6338 12.3593 30.6171 13.4486C29.6004 14.5258 29.0921 15.9116 29.0921 17.606C29.0921 19.3125 29.6065 20.7165 30.6352 21.8179C31.6761 22.9193 32.953 23.4699 34.4659 23.4699C36.0272 23.4699 37.3222 22.9314 38.351 21.8542C39.3797 20.7649 39.8941 19.3428 39.8941 17.5878C39.8941 15.8692 39.3797 14.4773 38.351 13.4123C37.3222 12.3472 36.0211 11.8147 34.4477 11.8147Z"
        fill={color}
      />
      <Path
        d="M49.6069 7.74801H54.5449V9.76318C55.6705 8.81913 56.6872 8.16556 57.5949 7.80247C58.5148 7.42727 59.4528 7.23968 60.4089 7.23968C62.3696 7.23968 64.0338 7.9235 65.4014 9.29115C66.5512 10.4531 67.1261 12.1717 67.1261 14.4471V27.5003H62.2244V18.8405C62.2244 16.4804 62.1154 14.913 61.8976 14.1385C61.6918 13.3639 61.3227 12.7769 60.7902 12.3774C60.2697 11.9659 59.6222 11.7602 58.8476 11.7602C57.843 11.7602 56.9777 12.0991 56.2515 12.7768C55.5374 13.4425 55.0412 14.3684 54.7628 15.5545C54.6176 16.1718 54.5449 17.5092 54.5449 19.5667V27.5003H49.6069V7.74801Z"
        fill={color}
      />
      <Path
        d="M69.7404 7.74801H74.5877L78.5636 18.9857L82.8481 7.74801H85.8073L90.001 18.8587L93.9769 7.74801H98.8605L91.6531 27.5003H88.5123L84.3004 16.2444L79.9615 27.5003H76.857L69.7404 7.74801Z"
        fill={color}
      />
      <Path
        d="M116.271 7.74801H121.209V27.5003H116.271V25.4125C115.303 26.3323 114.328 26.998 113.348 27.4095C112.38 27.8089 111.327 28.0086 110.189 28.0086C107.635 28.0086 105.426 27.0222 103.563 25.0494C101.699 23.0645 100.767 20.6015 100.767 17.6605C100.767 14.6105 101.668 12.1112 103.472 10.1626C105.275 8.21398 107.466 7.23968 110.044 7.23968C111.23 7.23968 112.343 7.46358 113.384 7.9114C114.425 8.35921 115.387 9.03094 116.271 9.92657V7.74801ZM111.06 11.8147C109.523 11.8147 108.246 12.3593 107.23 13.4486C106.213 14.5258 105.705 15.9116 105.705 17.606C105.705 19.3125 106.219 20.7165 107.248 21.8179C108.289 22.9193 109.566 23.4699 111.079 23.4699C112.64 23.4699 113.935 22.9314 114.964 21.8542C115.992 20.7649 116.507 19.3428 116.507 17.5878C116.507 15.8692 115.992 14.4773 114.964 13.4123C113.935 12.3472 112.634 11.8147 111.06 11.8147Z"
        fill={color}
      />
      <Path d="M125.693 0.123047H130.649V27.5003H125.693V0.123047Z" fill={color} />
      <Path d="M134.625 0.123047H139.581V27.5003H134.625V0.123047Z" fill={color} />
    </Svg>
  </View>
);
