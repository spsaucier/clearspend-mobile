import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import tw from '@/Styles/tailwind';

const FadeOutGradient = ({ position = 'bottom-0' }: { position?: string }) => (
  <LinearGradient
    colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
    style={tw.style(`absolute left-0 right-0 h-32`, position ? tw`${position}` : '')}
    pointerEvents="none"
  />
);

export default FadeOutGradient;
