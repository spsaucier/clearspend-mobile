import React from 'react';
import { View } from 'react-native';
import { MapPinIcon } from '@/Components/Icons/mapPinIcon';
import { Address } from '@/generated/capital';
import { CSText } from '@/Components';
import tw from '@/Styles/tailwind';

interface AddressDisplayProps {
  address: Address | {};
  color?: string;
}

export const AddressDisplay = ({ address, color = 'white' }: AddressDisplayProps) =>
  ('streetLine1' in address && address.streetLine1 ? (
    <View style={tw`flex-row`}>
      <MapPinIcon size={20} color={color} />
      <View style={tw`ml-3`}>
        <CSText style={tw`text-${color} text-sm leading-5`}>{address?.streetLine1}</CSText>
        {address.streetLine2 ? (
          <CSText style={tw`text-${color} text-sm leading-5`}>{address?.streetLine2}</CSText>
        ) : null}
        {address?.locality && address.region ? (
          <CSText style={tw`text-${color} text-sm leading-5`}>
            {`${address?.locality}, ${address.region} ${address.postalCode}`}
          </CSText>
        ) : null}
      </View>
    </View>
  ) : null);
