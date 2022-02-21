import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type Props = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
  size?: string | number;
};

export const LegalIcon = ({ style, testID, size = 24 }: Props) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Path
        d="M20.0001 2.00014C19 2.00014 19 2 18 2L16 2L13.5 2H12.5C13.5 2 10.5 2.00014 11.9999 2.00014H7C6.86868 2.00013 6.73864 2.026 6.61731 2.07625C6.49598 2.1265 6.38574 2.20016 6.29288 2.29302C6.20003 2.38588 6.12637 2.49612 6.07611 2.61745C6.02586 2.73878 6 2.86882 6 3.00014V24.0001C6 24.1315 6.02586 24.2615 6.07611 24.3828C6.12637 24.5042 6.20003 24.6144 6.29288 24.7073C6.38574 24.8001 6.49598 24.8738 6.61731 24.924C6.73864 24.9743 6.86868 25.0001 7 25.0001H25C25.1313 25.0001 25.2614 24.9743 25.3827 24.924C25.504 24.8738 25.6143 24.8001 25.7071 24.7073C25.8 24.6144 25.8736 24.5042 25.9239 24.3828C25.9741 24.2615 26 24.1315 26 24.0001V3.00014C26 2.86882 25.9741 2.73878 25.9239 2.61745C25.8736 2.49612 25.8 2.38588 25.7071 2.29302C25.6143 2.20016 25.504 2.1265 25.3827 2.07625C25.2614 2.026 25.1313 2.00013 25 2.00014H20.0001Z"
        fill="#43FA76"
      />
      <Path
        d="M12 19H20"
        stroke="black"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 15H20"
        stroke="black"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.0002 5H25C25.2652 5 25.5196 5.10536 25.7071 5.29289C25.8946 5.48043 26 5.73478 26 6V27C26 27.2652 25.8946 27.5196 25.7071 27.7071C25.5196 27.8946 25.2652 28 25 28H7C6.73478 28 6.48043 27.8946 6.29289 27.7071C6.10536 27.5196 6 27.2652 6 27V6C6 5.73478 6.10536 5.48043 6.29289 5.29289C6.48043 5.10536 6.73478 5 7 5H11.9997"
        stroke="black"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 9V8C11 6.67392 11.5268 5.40215 12.4645 4.46447C13.4021 3.52678 14.6739 3 16 3C17.3261 3 18.5979 3.52678 19.5355 4.46447C20.4732 5.40215 21 6.67392 21 8V9H11Z"
        stroke="black"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);
