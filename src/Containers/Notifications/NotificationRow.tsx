import { View } from 'react-native';
import React from 'react';

import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';

type Props = {
  id: string;
};

export const NotificationRow = ({ id }: Props) => (
  <View style={tw`flex-row justify-between items-start py-3`} key={id}>
    {/* Merchant Icon or Category Icon */}
    <View style={tw`bg-primary rounded-full h-9 w-9 items-center justify-center`} />

    {/* Notification Info */}
    <View style={tw`flex-1 ml-3`}>
      <View style={tw`flex-row items-center justify-between`}>
        <CSText style={tw`text-sm text-black`}>Card Limit Reached</CSText>
        <CSText style={tw`text-xs text-gray60`}>20min ago</CSText>
      </View>
      <CSText style={tw`text-sm text-gray60 mt-2`}>
        You have reached monthly card spending limit of $500.00 on your Sales Card
      </CSText>
    </View>
  </View>
);
