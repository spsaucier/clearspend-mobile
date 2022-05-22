import React, { useState } from 'react';
import { View, TouchableOpacity, StyleProp, ViewProps } from 'react-native';
import { useTranslation } from 'react-i18next';
import tw from '@/Styles/tailwind';
import { CSText as Text } from '@/Components';

export enum AdminTab {
  Actions = 'Actions',
  Requests = 'Requests',
}

interface TabButtonProps {
  text: string;
  onPress: () => void;
}

const TabButton = ({ text, onPress }: TabButtonProps) => (
  <TouchableOpacity style={tw.style(`w-1/2 py-2 border-b border-gray-20`)} onPress={onPress}>
    <Text style={tw`text-sm text-center`}>{text}</Text>
  </TouchableOpacity>
);

interface Props {
  style?: StyleProp<ViewProps>;
  children: ({ selectedTab }: { selectedTab: AdminTab }) => React.ReactNode;
}

const ActionsAndRequestsTabs = ({ style, children }: Props) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<AdminTab>(AdminTab.Actions);

  return (
    <>
      <View style={style}>
        <View style={tw`flex-row pb-px`}>
          <TabButton
            text={t('admin.actionsTab')}
            onPress={() => setSelectedTab(AdminTab.Actions)}
          />
          <TabButton
            text={t('admin.requestsTab')}
            onPress={() => setSelectedTab(AdminTab.Requests)}
          />
          <View
            style={tw.style(
              `absolute w-1/2 bottom-0 bg-black h-0.5`,
              selectedTab === AdminTab.Actions ? 'left-0' : 'left-1/2',
            )}
          />
        </View>
        {children && children({ selectedTab })}
      </View>
    </>
  );
};

export default ActionsAndRequestsTabs;
