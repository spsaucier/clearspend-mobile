import { SafeAreaView } from 'react-native-safe-area-context';
import { SectionList, View } from 'react-native';
import React from 'react';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import * as categoryIcons from '@/Components/Icons/Categories';
import * as icons from '@/Components/Icons';

export const IconDemoScreen = () => {
  const data = [
    {
      title: 'Merchant & Expense Category Icons',
      data: Object.entries(categoryIcons).filter(
        ([name]) => name !== 'MERCHANT_CATEGORY_ICON_NAME_MAP',
      ),
    },
    { title: 'All Other Icons', data: Object.entries(icons) },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-10`}>
      <CSText style={tw`text-2xl ml-4`}>All Icons</CSText>

      <SectionList
        sections={data}
        renderItem={({ item }) => {
          const [name, Icon] = item;

          return (
            <View style={tw`flex-row items-center p-3 border-b-2`}>
              {/* @ts-ignore */}
              <Icon style={tw`ml-2 mr-4 w-10`} size={32} />
              <CSText>{name}</CSText>
            </View>
          );
        }}
        renderSectionHeader={({ section }) => (
          <CSText style={tw`text-xl bg-white pt-1 pb-1`}>{section.title}</CSText>
        )}
        contentContainerStyle={tw`pt-4 pb-4`}
      />
    </SafeAreaView>
  );
};
