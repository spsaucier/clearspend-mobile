import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Toast from 'react-native-toast-message';
import { isEqual } from 'lodash';
import tw from '@/Styles/tailwind';
import { BackButtonNavigator } from '@/Components/BackButtonNavigator';
import { Button, CSText, FocusAwareStatusBar } from '@/Components';
import { useUser, useUpdateUser } from '@/Queries/user';
import { Address, UpdateUserRequest } from '@/generated/capital';
import { AddressDisplay } from './Components/AddressDisplay';
import { useAddressSuggestions } from '@/Hooks/useAddressSuggestions';
import { CloseIcon } from '@/Components/Icons';
import { getFontSizeMultiplier } from '@/Helpers/StyleHelpers';

export interface AutocompleteItem {
  id: string;
  title: string;
}

const addressToString = (a: Address) => `${a.streetLine1} ${a.locality} ${a.postalCode}`;

const UpdateAddressScreen = () => {
  const { t } = useTranslation();
  const { goBack } = useNavigation();
  const [address, setAddress] = useState<Address | { streetLine2: string }>({ streetLine2: '' });
  const { isLoading, error, data: user } = useUser();
  const { suggestions, isLoading: loading, setSearch } = useAddressSuggestions();
  const { mutate } = useUpdateUser();

  useEffect(() => {
    if (!isLoading && !error && user && user.address) {
      setAddress(user.address);
      setSearch(addressToString(user.address));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, user, error]);

  const onSubmit = async () => {
    if (user && address) {
      await mutate({ ...user, address } as UpdateUserRequest);
      Toast.show({
        type: 'success',
        text1: t('toasts.addressUpdated'),
      });
      goBack();
    }
  };

  const dropdownController = useRef(null);

  const selectedAddress = useCallback(
    () => 'streetLine1' in address && !!address?.streetLine1,
    [address],
  );

  const inputStyle = tw`bg-transparent text-2xl text-black pt-8 font-telegraf p-0 m-0`;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView style={tw`flex-1 p-5 mb-5 justify-between`} behavior="padding">
        <View style={Platform.select({ ios: { zIndex: 1 } })}>
          <BackButtonNavigator />
          <View style={tw`mt-3`}>
            {selectedAddress() ? (
              <TouchableOpacity style={tw`m-5 mx-0`} onPress={() => setAddress({})}>
                <CSText style={tw`mb-2 text-xs uppercase tracking-widest`}>
                  {t('profile.updateAddress.selectedAddress')}
                </CSText>
                <View style={tw`border-1 border-black-20 p-3 rounded-1`}>
                  <AddressDisplay address={address} color="black" hideLine2 inline />
                </View>
              </TouchableOpacity>
            ) : (
              <AutocompleteDropdown
                controller={(controller) => {
                  dropdownController.current = controller;
                }}
                dataSet={
                  suggestions.map((s, id) => ({
                    id: id.toString(),
                    title: `${s.primary_line} ${s.city}, ${s.state} ${s.zip_code}`,
                  })) || []
                }
                onChangeText={setSearch}
                onSelectItem={(item: AutocompleteItem) => {
                  if (item) {
                    const selected = suggestions[Number(item.id)];
                    setAddress({
                      streetLine1: selected.primary_line,
                      locality: selected.city,
                      region: selected.state,
                      postalCode: selected.zip_code,
                    });
                  }
                }}
                debounce={600}
                suggestionsListMaxHeight={Dimensions.get('window').height * 0.3}
                loading={loading}
                useFilter={false} // prevent rerender twice
                containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                inputContainerStyle={tw`bg-transparent`}
                textInputProps={{
                  placeholder: t('profile.updateAddress.placeholder'),
                  autoCorrect: false,
                  autoCapitalize: 'none',
                  style: inputStyle,
                  placeholderTextColor: tw.color('secondary-disabled'),
                  maxFontSizeMultiplier: getFontSizeMultiplier(),
                }}
                ClearIconComponent={<CloseIcon color={tw.color('gray-50')} />}
                rightButtonsContainerStyle={{
                  borderRadius: 25,
                  height: 30,
                  top: 10,
                  alignSelf: 'center',
                  backgroundColor: 'transparent',
                }}
                renderItem={(item) => <CSText style={{ padding: 15 }}>{item.title}</CSText>}
                inputHeight={50}
                showChevron={false}
              />
            )}
            <TextInput
              style={inputStyle}
              value={address.streetLine2}
              placeholder={t('profile.updateAddress.line2Placeholder')}
              placeholderTextColor={tw.color('secondary-disabled')}
              onChangeText={(streetLine2) => setAddress({ ...address, streetLine2 })}
              maxFontSizeMultiplier={getFontSizeMultiplier()}
            />
          </View>
        </View>
        <View>
          <Button
            containerStyle={[tw`${selectedAddress() ? 'bg-primary' : 'bg-gray-5'}`]}
            onPress={onSubmit}
            disabled={!selectedAddress() || isEqual(address, user?.address)}
          >
            {t('profile.updateAddress.cta')}
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UpdateAddressScreen;
