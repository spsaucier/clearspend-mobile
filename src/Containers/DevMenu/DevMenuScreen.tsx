import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNavigation } from '@react-navigation/core';
import { Button, CSText } from '@/Components';
import tw from '@/Styles/tailwind';
import { MainScreens } from '@/Navigators/NavigatorTypes';

const DevMenuScreen = () => {
  const { navigate } = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-gray90`}>
      <CSText style={tw`text-2xl pl-4`}>Dev Menu</CSText>
      <View style={tw`flex-1 mt-5 pl-2 pr-2`}>
        <Button
          label="Icon Demo"
          containerStyle={tw`mb-4`}
          onPress={() => navigate(MainScreens.DevIconDemo)}
        />
      </View>
    </SafeAreaView>
  );
};

export default DevMenuScreen;
