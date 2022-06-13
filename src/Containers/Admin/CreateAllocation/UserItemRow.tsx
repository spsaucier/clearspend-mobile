import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LetterAvatar } from '@/Components';
import { CheckMarkIcon } from '@/Components/Icons';
import tw from '@/Styles/tailwind';

type UserItemRowProps = {
  userId: string;
  name: string;
  email: string;
  initials: string;
  onPress: () => void;
  isSelected: boolean;
};

const UserItemRow = ({ userId, initials, name, email, onPress, isSelected }: UserItemRowProps) => (
  <TouchableOpacity key={userId} testID={userId} style={tw`flex-row py-3`} onPress={onPress}>
    {isSelected ? (
      <View style={tw`justify-center items-center w-10 h-10 rounded-full bg-primary`}>
        <CheckMarkIcon testID={`${userId}-check-mark-icon`} size={12} color={tw.color('black')} />
      </View>
    ) : (
      <LetterAvatar initials={initials} />
    )}

    <View style={tw`mx-4 flex-shrink-1`}>
      <Text style={tw`mb-1`} numberOfLines={1}>
        {name}
      </Text>
      <Text style={tw`text-sm text-gray-50`} numberOfLines={1}>
        {email}
      </Text>
    </View>
  </TouchableOpacity>
);

export default UserItemRow;
