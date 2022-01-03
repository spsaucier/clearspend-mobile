import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import { ActivityIndicator, CSText, FocusAwareStatusBar } from '@/Components';
import { CloseIcon } from '@/Components/Icons';
import tw from '@/Styles/tailwind';
import { CardInfoContent } from './Components/CardInfoContent';
import { useCard } from '@/Queries';

const CardInfoScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const route = useRoute();
  const { cardId } = route.params as any;

  const { data, error, isLoading } = useCard(cardId);

  return (
    <BlurView style={tw`flex-1`} blurAmount={25} overlayColor={tw.color('black')} blurType="dark">
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <SafeAreaView
        style={tw.style('flex-1 justify-between', { backgroundColor: 'rgba(0,0,0,0.5)' })}
      >
        {isLoading && (
          <View style={tw`flex-1 items-center justify-center p-6`}>
            <ActivityIndicator />
          </View>
        )}
        {!isLoading && error && (
          <View style={tw`flex-1 items-center justify-center p-6`}>
            <CSText style={tw`text-base text-error mb-2`}>{error.message}</CSText>
          </View>
        )}
        {!isLoading && !error && data && <CardInfoContent cardData={data} />}

        {/* Dismiss button */}
        <View style={tw`flex-initial mb-6`}>
          <TouchableOpacity
            style={tw`flex flex-row items-center justify-center p-3`}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <CloseIcon
              style={tw`rounded-full border-2 border-white w-7 h-7`}
              color={tw.color('white')}
            />
            <CSText style={tw`ml-3 text-lg text-white`}>{t('cardInfo.dismiss')}</CSText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </BlurView>
  );
};

export default CardInfoScreen;
