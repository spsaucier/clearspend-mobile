import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const MarketingIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 32,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M16 16L28 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24.4853 7.51474C22.3596 5.39326 19.5151 4.14688 16.5145 4.02219C13.5139 3.89749 10.5757 4.90356 8.28138 6.84137C5.98702 8.77917 4.50354 11.5075 4.12444 14.4867C3.74533 17.4659 4.49821 20.4788 6.23414 22.9295C7.97006 25.3802 10.5626 27.09 13.4988 27.7208C16.435 28.3516 19.501 27.8573 22.0902 26.3358C24.6795 24.8143 26.6034 22.3764 27.4813 19.5044C28.3591 16.6324 28.1271 13.5355 26.831 10.8263"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.2427 11.7573C19.2507 10.7654 17.9425 10.1525 16.5455 10.025C15.1485 9.89747 13.751 10.2635 12.5959 11.0595C11.4408 11.8554 10.6011 13.031 10.2227 14.3818C9.84436 15.7326 9.9513 17.1733 10.5249 18.4535C11.0986 19.7336 12.1026 20.7723 13.3626 21.389C14.6226 22.0057 16.0589 22.1614 17.4217 21.829C18.7846 21.4967 19.9879 20.6973 20.8226 19.5698C21.6572 18.4423 22.0704 17.058 21.9903 15.6575"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
