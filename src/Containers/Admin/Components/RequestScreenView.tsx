import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/Styles/tailwind';
import { CSText as Text, ActivityIndicator, FocusAwareStatusBar, Button } from '@/Components';

interface Props {
  isError?: boolean;
  error?: any;
  errorTitle?: string;
  errorText?: string;
  requestText?: string;
  onPrimaryAction?: () => void;
  onPrimaryActionLabel?: string;
}

const RequestScreenView = ({
  isError,
  error,
  errorTitle,
  errorText,
  requestText,
  onPrimaryAction,
  onPrimaryActionLabel,
}: Props) => (
  <SafeAreaView style={tw`flex-1 bg-white px-5`} edges={['top', 'bottom']}>
    <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    {isError ? (
      <>
        <View style={tw`flex-1 justify-center items-center`}>
          {(error as any)?.response?.data?.message ? (
            <Text>{(error as any).response.data.message}</Text>
          ) : (
            <>
              {errorText && <Text>{errorTitle}</Text>}
              {errorTitle && <Text style={tw`mt-2`}>{errorText}</Text>}
            </>
          )}
        </View>
        <View style={tw`mt-auto py-5`}>
          <Button
            testID="primary-action-button"
            label={onPrimaryActionLabel}
            onPress={onPrimaryAction}
          />
        </View>
      </>
    ) : (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator />
        {requestText && <Text style={tw`mt-6`}>{requestText}</Text>}
      </View>
    )}
  </SafeAreaView>
);

export default RequestScreenView;
