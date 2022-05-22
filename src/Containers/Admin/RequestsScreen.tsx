import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { LetterAvatar, CSText, ActivityIndicator } from '@/Components';
import tw from '@/Styles/tailwind';

const RequestsScreenContent = ({ data }: { data: any }) => {
  const { t } = useTranslation();

  const renderRowItem = (row: any) => {
    const { item } = row;

    return (
      <TouchableOpacity
        style={[
          tw`bg-tan rounded my-2 p-3 border-1 border-tan`,
          item.read ? tw`bg-white border-gray-10` : null,
        ]}
      >
        <View style={tw`flex-row items-center`}>
          <CSText style={tw`font-medium`}>{t('admin.requests.newRequestFrom')}</CSText>
          <LetterAvatar initials={item.initials} />
          <CSText>{` ${item.name}`}</CSText>
        </View>
        <View style={tw`pt-2`}>
          <CSText style={tw`w-full`} numberOfLines={1}>
            {item.description}
          </CSText>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList<any>
      contentContainerStyle={tw`pb-10`}
      data={data}
      renderItem={renderRowItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

const RequestsScreen = () => {
  const isLoading = false;

  const data = [
    {
      name: 'Jane Olsen',
      initials: 'JO',
      description: 'Spend limit increase for Events ',
      read: false,
    },
    {
      name: 'Dean Smith',
      initials: 'DS',
      description: 'Replacement for a lost or stolen card',
      read: false,
    },
    {
      name: 'Christopher Anazuma ',
      initials: 'CA',
      description: 'Transaction limit increase for Q4 Marketing B123 etc',
      read: false,
    },
    {
      name: 'Hampus Jagland',
      initials: 'HJ',
      description: 'Spend limit increase for Events ',
      read: false,
    },
    {
      name: 'Erica Box',
      initials: 'EB',
      description: 'Replacement for a lost or stolen card',
      read: true,
    },
    {
      name: 'Rodrigo',
      initials: 'RM',
      description: 'Replacement for a lost or stolen card',
      read: true,
    },
    {
      name: 'Rodrigo',
      initials: 'RM',
      description: 'Replacement for a lost or stolen card',
      read: true,
    },
    {
      name: 'Rodrigo',
      initials: 'RM',
      description: 'Replacement for a lost or stolen card',
      read: true,
    },
    {
      name: 'Rodrigo',
      initials: 'RM',
      description: 'Replacement for a lost or stolen card',
      read: true,
    },
  ];

  return (
    <View style={tw`flex-1`}>
      {isLoading ? (
        <View style={tw`items-center flex-1 justify-center`}>
          <ActivityIndicator />
        </View>
      ) : (
        <RequestsScreenContent data={data} />
      )}
    </View>
  );
};

export default RequestsScreen;
