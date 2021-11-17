import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';

type Props = {
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  size?: string | number;
};

export const ReceiptIcon = ({ color = tw.color('primary'), style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.2462 19.8949C18.297 19.9452 18.3616 19.9794 18.4317 19.9931C18.5019 20.0069 18.5746 19.9997 18.6407 19.9725C18.7067 19.9452 18.7633 19.899 18.8033 19.8397C18.8433 19.7805 18.865 19.7107 18.8656 19.6392V4.36409C18.8656 4.26764 18.8272 4.17514 18.759 4.10693C18.6908 4.03873 18.5983 4.00041 18.5019 4.0004H6.8637C6.85234 3.99987 6.84096 3.99987 6.8296 4.0004C6.73917 4.00892 6.6552 4.05097 6.59421 4.11827C6.53322 4.18558 6.49961 4.27326 6.5 4.36409V19.6392C6.50059 19.7107 6.52223 19.7805 6.56224 19.8397C6.60224 19.899 6.65883 19.9452 6.72492 19.9725C6.79102 19.9997 6.86369 20.0069 6.93385 19.9931C7.00402 19.9794 7.06856 19.9452 7.11942 19.8949L8.31847 18.6959L9.51752 19.8949C9.58561 19.9622 9.6775 20 9.77324 20C9.86899 20 9.96088 19.9622 10.029 19.8949L11.228 18.6959L12.4271 19.8949C12.4952 19.9622 12.587 20 12.6828 20C12.7785 20 12.8704 19.9622 12.9385 19.8949L14.1376 18.6959L15.3366 19.8949C15.4047 19.9622 15.4966 20 15.5923 20C15.6881 20 15.78 19.9622 15.8481 19.8949L17.0471 18.6959L18.2462 19.8949ZM17.6156 17.5826V5.2504H7.75V17.5826C7.92442 17.4936 8.11898 17.4459 8.31847 17.4459C8.64999 17.4459 8.96793 17.5776 9.20235 17.812L9.77324 18.3829L10.3441 17.812C10.5786 17.5776 10.8965 17.4459 11.228 17.4459C11.5595 17.4459 11.8775 17.5776 12.1119 17.812L12.6828 18.3829L13.2537 17.812C13.4881 17.5776 13.806 17.4459 14.1376 17.4459C14.4691 17.4459 14.787 17.5776 15.0214 17.812L15.5923 18.3829L16.1632 17.812C16.3976 17.5776 16.7156 17.4459 17.0471 17.4459C17.2466 17.4459 17.4412 17.4936 17.6156 17.5826Z"
        fill={color}
      />
      <Path d="M9.25 8.5H15.85V9.75H9.25V8.5Z" fill={color} />
      <Path d="M9.25 11.5H13.25V12.75H9.25V11.5Z" fill={color} />
    </Svg>
  </View>
);