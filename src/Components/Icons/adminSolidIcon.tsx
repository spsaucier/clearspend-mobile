import React from 'react';
import { View } from 'react-native';
import { Path, Svg } from 'react-native-svg';

import tw from '@/Styles/tailwind';
import { IconBaseProps } from '@/Components/Icons/types';

const aspectRatio = 30 / 23;

export const AdminSolidIcon = ({
  color = tw.color('black'),
  style,
  testID,
  size = 30,
}: IconBaseProps) => (
  <View style={[{ aspectRatio, height: size, width: size }, style]} testID={testID}>
    <Svg width="100%" height="100%" viewBox="0 0 30 23" fill="none">
      <Path
        d="M7.25807 12.4356C7.25808 12.5627 7.23305 12.6885 7.18442 12.8059C7.13579 12.9233 7.06451 13.03 6.97464 13.1199C6.88478 13.2097 6.7781 13.281 6.66068 13.3297C6.54327 13.3783 6.41743 13.4033 6.29034 13.4033H6.29028L0.967608 13.4028C0.78784 13.4028 0.611631 13.3527 0.458737 13.2582C0.305842 13.1636 0.182307 13.0283 0.101981 12.8675C0.0216549 12.7067 -0.0122868 12.5267 0.00396134 12.3476C0.0202095 12.1686 0.0860051 11.9976 0.193972 11.8539C1.05166 10.7048 2.1956 9.80049 3.51173 9.23128C2.9462 8.71433 2.51154 8.07045 2.24355 7.35264C1.97556 6.63484 1.8819 5.86365 1.97028 5.10256C2.05866 4.34148 2.32655 3.61227 2.75189 2.97497C3.17724 2.33768 3.74788 1.81053 4.41682 1.43693C5.08577 1.06333 5.83388 0.853962 6.59957 0.826067C7.36527 0.798172 8.12663 0.952546 8.82099 1.27648C9.51534 1.60041 10.1228 2.08464 10.5934 2.68929C11.064 3.29395 11.3843 4.00173 11.5278 4.75437C11.5649 4.94985 11.5409 5.15203 11.4589 5.33336C11.377 5.51469 11.2412 5.66635 11.0699 5.76769C9.5032 6.69453 8.31078 8.14106 7.69994 9.85584C7.40649 10.6842 7.25704 11.5568 7.25807 12.4356ZM29.806 11.8537C28.9484 10.7045 27.8044 9.80025 26.4883 9.23105C27.0538 8.7141 27.4885 8.07022 27.7565 7.35242C28.0245 6.63462 28.1181 5.86344 28.0298 5.10236C27.9414 4.34128 27.6735 3.61207 27.2482 2.97478C26.8228 2.33749 26.2522 1.81034 25.5833 1.43673C24.9143 1.06313 24.1662 0.853749 23.4005 0.825842C22.6349 0.797935 21.8735 0.952295 21.1791 1.27621C20.4848 1.60013 19.8773 2.08434 19.4067 2.68898C18.9361 3.29362 18.6158 4.00138 18.4723 4.75401C18.4352 4.94949 18.4592 5.15166 18.5411 5.33298C18.6231 5.51431 18.7589 5.66598 18.9301 5.76734C20.4968 6.69425 21.6892 8.1408 22.3001 9.8556C22.5935 10.684 22.743 11.5565 22.7419 12.4353C22.7419 12.5624 22.767 12.6883 22.8156 12.8057C22.8643 12.9231 22.9356 13.0298 23.0254 13.1197C23.1153 13.2095 23.222 13.2808 23.3394 13.3294C23.4568 13.3781 23.5827 13.4031 23.7098 13.4031L29.0324 13.4026C29.2122 13.4026 29.3884 13.3525 29.5413 13.2579C29.6942 13.1634 29.8177 13.0281 29.898 12.8673C29.9783 12.7065 30.0123 12.5264 29.996 12.3474C29.9798 12.1684 29.914 11.9974 29.806 11.8537L29.806 11.8537ZM18.5277 17.0429C19.4919 16.3054 20.2008 15.2842 20.5545 14.1229C20.9082 12.9616 20.8891 11.7186 20.4998 10.5688C20.1104 9.41894 19.3705 8.42004 18.384 7.71255C17.3975 7.00506 16.2141 6.62457 15.0001 6.62457C13.7861 6.62457 12.6027 7.00506 11.6162 7.71255C10.6297 8.42004 9.88979 9.41894 9.50046 10.5688C9.11113 11.7186 9.09199 12.9616 9.44574 14.1229C9.79948 15.2842 10.5083 16.3054 11.4726 17.0429C9.58852 17.8747 8.06213 19.35 7.16675 21.2047C7.09484 21.3522 7.06163 21.5156 7.07025 21.6795C7.07887 21.8434 7.12904 22.0024 7.21603 22.1416C7.30303 22.2808 7.42399 22.3955 7.56755 22.4751C7.71111 22.5546 7.87254 22.5964 8.03667 22.5963H21.9636C22.1277 22.5963 22.2891 22.5546 22.4327 22.475C22.5762 22.3955 22.6972 22.2807 22.7842 22.1416C22.8711 22.0024 22.9213 21.8434 22.9299 21.6795C22.9386 21.5156 22.9054 21.3522 22.8335 21.2047C21.9381 19.35 20.4117 17.8747 18.5277 17.0429Z"
        fill={color}
      />
    </Svg>
  </View>
);