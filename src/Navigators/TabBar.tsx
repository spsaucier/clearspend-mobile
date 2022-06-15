import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import { CSText as Text } from '@/Components/Text';
import { WalletSolidIcon, AdminSolidIcon, ProfileSolidIcon } from '@/Components/Icons';
import { TabScreens } from '@/Navigators/NavigatorTypes';

const ICON_MAP = {
  [TabScreens.Wallet]: WalletSolidIcon,
  [TabScreens.Admin]: AdminSolidIcon,
  [TabScreens.Profile]: ProfileSolidIcon,
};

export const TAB_BAR_HEIGHT = 60;

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => (
  <SafeAreaView style={tw`bg-white`} edges={['bottom']}>
    <View
      style={tw.style(`flex-row items-center justify-center px-5 bg-white`, {
        height: TAB_BAR_HEIGHT,
      })}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            // @ts-ignore
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const Icon = ICON_MAP[route.name as TabScreens];

        return (
          <View key={route.key} style={tw`flex-1 px-2.5`}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={tw.style(
                `flex-row items-center justify-center px-2.5 h-10 rounded`,
                isFocused ? `bg-tan` : '',
              )}
            >
              {Icon ? <Icon /> : null}
              {isFocused ? (
                <Text
                  style={tw`font-montreal font-medium uppercase text-2xs text-black tracking-widest ml-2`}
                >
                  {label}
                </Text>
              ) : null}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  </SafeAreaView>
);

export default TabBar;
