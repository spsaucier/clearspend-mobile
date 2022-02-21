import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const CloseIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.26843 15.3704C6.91294 15.7186 6.90569 16.357 7.27569 16.727C7.64569 17.097 8.28412 17.0825 8.63236 16.7343L11.9986 13.368L15.3649 16.727C15.7277 17.0898 16.3516 17.097 16.7216 16.7198C17.0916 16.3498 17.0916 15.7258 16.7288 15.3631L13.3698 12.0041L16.7288 8.6378C17.0916 8.27505 17.0916 7.65113 16.7216 7.28113C16.3516 6.90387 15.7277 6.91113 15.3649 7.27387L11.9986 10.6329L8.63236 7.26662C8.28412 6.91838 7.64569 6.90387 7.27569 7.27387C6.90569 7.64387 6.91294 8.28231 7.26843 8.6378L10.6347 12.0041L7.26843 15.3704Z"
        fill={color}
      />
    </Svg>
  </View>
);
