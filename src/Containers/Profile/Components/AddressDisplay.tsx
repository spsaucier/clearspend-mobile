import React from 'react';
import { View } from 'react-native';
import { MapPinIcon } from '@/Components/Icons';
import { Address } from '@/generated/capital';
import { CSText } from '@/Components';
import tw from '@/Styles/tailwind';

interface AddressDisplayProps {
  address: Address | {};
  color?: string;
  hideLine2?: boolean;
  inline?: boolean;
}

export const AddressDisplay = ({ address, color = 'white', inline, hideLine2 }: AddressDisplayProps) =>
  'streetLine1' in address && address.streetLine1 ? (
    <View style={tw`flex-row overflow-hidden`}>
      <MapPinIcon size={20} color={color} />
      <View style={tw`ml-3 ${inline ? 'flex-row' : ''}`}>
        <CSText style={tw`text-${color} text-sm leading-5 mr-1`}>{address?.streetLine1}</CSText>
        {address.streetLine2 && !hideLine2  ? (
          <CSText style={tw`text-${color} text-sm leading-5 mr-1`}>{address?.streetLine2}</CSText>
        ) : null}
        {address?.locality && address.region ? (
          <CSText style={tw`text-${color} text-sm leading-5`}>
            {`${address?.locality}, ${address.region} ${address.postalCode}`}
          </CSText>
        ) : null}
      </View>
    </View>
  ) : null;
