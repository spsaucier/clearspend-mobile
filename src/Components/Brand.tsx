import React from 'react'
import { View, Image } from 'react-native'
import tw from '@/Styles/tailwind'

interface Props {
  height?: number | string
  width?: number | string
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center'
}

const Brand = ({ height = 200, width = 200, mode = 'contain' }: Props) => {
  return (
    <View style={{ height, width }}>
      <Image
        style={tw`h-full w-full`}
        source={require('@/Assets/Images/tranwall.png')}
        resizeMode={mode}
      />
    </View>
  )
}

export default Brand
