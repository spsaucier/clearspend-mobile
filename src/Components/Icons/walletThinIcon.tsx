import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const WalletThinIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M2.89661 5.96875L2.89661 17.75C2.89661 18.8546 3.79203 19.75 4.8966 19.75H18.2759C19.3805 19.75 20.2759 18.8546 20.2759 17.75V13.8438M20.2759 13.8438V10.9375C20.2759 9.28065 18.9328 7.9375 17.2759 7.9375H15.388H4.86536C3.77805 7.9375 2.89661 7.05606 2.89661 5.96875V5.96875C2.89661 4.88144 3.77805 4 4.86536 4H17.6022C19.0788 4 20.2759 5.19707 20.2759 6.67374V13.8438Z"
        stroke={color}
        strokeWidth="1.2"
      />
      <Path
        d="M14.845 12.875C14.845 12.3227 15.2927 11.875 15.845 11.875H20.276V16.375H15.845C15.2927 16.375 14.845 15.9273 14.845 15.375V12.875Z"
        stroke={color}
        strokeWidth="1.2"
      />
    </Svg>
  </View>
);
