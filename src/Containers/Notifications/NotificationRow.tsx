import { Text, View } from 'react-native';
import React from 'react';

import tw from '@/Styles/tailwind';

type Props = {
  id: string;
};

export const NotificationRow = ({ id }: Props) => (
  <View style={tw`flex-row justify-between items-center py-3`} key={id}>
    <View style={tw`flex-row items-start`}>
      {/* Merchant Icon or Category Icon */}
      <View style={tw`p-1 bg-secondary rounded-lg h-9 w-9 items-center justify-center`} />

      {/* Notification Info */}
      <View style={tw`flex ml-3`}>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-sm text-copyDark font-bold`}>Card Limit Reached</Text>
          <Text style={tw`text-xs text-gray60`}>20min ago</Text>
        </View>
        <Text style={tw`text-sm text-gray60 mt-2`}>
          You have reached monthly card spending limit of $500.00 on your Sales Card
        </Text>
      </View>
    </View>
  </View>
);
