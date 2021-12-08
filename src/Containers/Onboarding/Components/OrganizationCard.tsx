import React from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';

interface Props {
  onPress: () => void;
  isSelected: boolean;
  companyName: string;
  memberSinceDate: string;
  logoUrl?: string;
}

export const OrganizationCard = ({
  onPress,
  isSelected,
  companyName,
  memberSinceDate,
  logoUrl,
}: Props) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={tw.style(
        'flex-row items-center justify-between bg-white rounded-2xl h-28 px-6',
        isSelected ? 'm-0' : 'm-3',
      )}
    >
      <View style={tw`flex-row items-center`}>
        {logoUrl ? (
          <Image
            source={{
              uri: logoUrl,
            }}
            resizeMode="contain"
          />
        ) : (
          <View style={tw`bg-primary-new rounded-full h-14 w-14 items-center justify-center`} />
        )}
        <View style={tw`ml-7`}>
          <CSText style={tw`text-base text-black font-bold mb-2`}>{companyName}</CSText>
          <CSText style={tw`text-sm text-gray50`}>
            Member Since
            {memberSinceDate}
          </CSText>
        </View>
      </View>
      {/* Toggle Dot */}
      <View
        style={tw.style(
          'rounded-full h-5 w-5',
          isSelected ? 'border-6 border-primary-new bg-white' : 'border border-gray90 bg-white',
        )}
      />
    </View>
  </TouchableWithoutFeedback>
);
