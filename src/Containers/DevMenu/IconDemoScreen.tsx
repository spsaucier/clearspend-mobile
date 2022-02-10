import { SafeAreaView } from 'react-native-safe-area-context';
import { SectionList, View } from 'react-native';
import React from 'react';
import tw from '@/Styles/tailwind';
import { CSText } from '@/Components';
import * as categoryIcons from '@/Components/Icons/Categories';
import * as icons from '@/Components/Icons';
import { CategoryIcon } from '@/Components/CategoryIcon';

export const IconDemoScreen = () => {
  const categoryIconComponentVariants = [
    5172, 4582, 1, 1500, 3000, 3300, 3500, 4000, 4800, 5000, 5600, 5700, 7300, 8000, 9000, 10000,
  ].map((code) => [code.toString(), () => <CategoryIcon code={code} />]);

  const data = [
    { title: 'New Category Icons', data: Object.entries(categoryIcons) },
    { title: 'Existing <CategoryIcon /> Icons', data: categoryIconComponentVariants },
    { title: 'All Other Icons', data: Object.entries(icons) },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-gray90`}>
      <CSText style={tw`text-2xl ml-4`}>All Icons</CSText>

      <SectionList
        // @ts-ignore doesn't like the rendered component variants
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
