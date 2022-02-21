import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

export const EyeIcon = ({
  color = tw.color('primary'),
  style,
  testID,
  size = 24,
}: IconBaseProps) => (
  <View style={[{ aspectRatio: 1, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.8281 12.1158C20.4671 11.5663 21.0546 10.9596 21.5833 10.3033C21.7081 10.1486 21.7664 9.95064 21.7453 9.75295C21.7242 9.55526 21.6255 9.37403 21.4709 9.24909C21.3162 9.12415 21.1183 9.06573 20.9206 9.08666C20.7229 9.10759 20.5416 9.20617 20.4165 9.36072C19.8299 10.0907 19.1602 10.75 18.4211 11.3252C18.4161 11.3287 18.4114 11.3327 18.4065 11.3364C16.5763 12.7598 14.3184 13.5224 11.9999 13.5C9.68083 13.5224 7.4224 12.7595 5.59194 11.3354C5.58622 11.3311 5.58084 11.3264 5.57496 11.3222C4.83728 10.7478 4.16887 10.0895 3.58318 9.36072C3.52129 9.28411 3.44491 9.22044 3.35841 9.17335C3.27191 9.12626 3.17699 9.09666 3.07905 9.08626C2.98111 9.07585 2.88208 9.08484 2.78762 9.1127C2.69316 9.14057 2.60511 9.18676 2.5285 9.24866C2.45189 9.31055 2.38822 9.38693 2.34113 9.47343C2.29403 9.55993 2.26444 9.65486 2.25403 9.75279C2.24363 9.85073 2.25261 9.94976 2.28048 10.0442C2.30834 10.1387 2.35454 10.2267 2.41644 10.3033C2.94411 10.9583 3.53034 11.5639 4.16786 12.1126L2.33999 15.2785C2.29074 15.3638 2.25878 15.4579 2.24592 15.5556C2.23306 15.6532 2.23956 15.7525 2.26505 15.8476C2.29054 15.9427 2.33451 16.0319 2.39447 16.11C2.45442 16.1882 2.52917 16.2537 2.61446 16.303C2.69975 16.3522 2.79391 16.3842 2.89155 16.397C2.9892 16.4099 3.08842 16.4034 3.18355 16.3779C3.27868 16.3524 3.36786 16.3085 3.44599 16.2485C3.52413 16.1885 3.58969 16.1138 3.63894 16.0285L5.37238 13.0261C6.38646 13.7058 7.50161 14.221 8.67654 14.5525L8.13143 17.6442C8.09693 17.8401 8.14164 18.0417 8.25575 18.2046C8.36985 18.3676 8.544 18.4785 8.73989 18.5131C8.78318 18.5207 8.82705 18.5245 8.871 18.5245C9.04718 18.5242 9.21765 18.462 9.35254 18.3486C9.48742 18.2353 9.57812 18.0781 9.60873 17.9046L10.1447 14.8645C11.3721 15.0447 12.6192 15.0451 13.8467 14.8658L14.3827 17.9059C14.4134 18.0794 14.5041 18.2365 14.639 18.3499C14.7738 18.4632 14.9443 18.5254 15.1205 18.5257C15.1645 18.5257 15.2084 18.5218 15.2517 18.5142C15.4476 18.4797 15.6217 18.3687 15.7358 18.2058C15.8499 18.0428 15.8946 17.8412 15.86 17.6453L15.3151 14.5549C16.4914 14.2239 17.608 13.7088 18.6233 13.0288L20.3467 16.0137C20.4461 16.1859 20.6099 16.3116 20.8021 16.3631C20.9942 16.4146 21.1989 16.3876 21.3711 16.2881C21.5434 16.1887 21.6691 16.0249 21.7206 15.8328C21.772 15.6406 21.7451 15.4359 21.6456 15.2637L19.8281 12.1158Z"
        fill={color}
      />
    </Svg>
  </View>
);
