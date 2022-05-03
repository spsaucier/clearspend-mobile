import React, { useRef } from 'react';
import { View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import tw from '@/Styles/tailwind';
import AdminScreenWrapper from '@/Containers/Admin/Components/AdminScreenWrapper';
import { IssueCardStackParamTypes, IssueCardScreens } from '@/Navigators/Admin/AdminNavigatorTypes';
import { CloseIcon } from '@/Components/Icons';
import { useAddressSuggestions } from '@/Hooks/useAddressSuggestions';
import { getFontSizeMultiplier } from '@/Helpers/StyleHelpers';
import { CSText as Text } from '@/Components';
import { useIssueCardContext } from '@/Hooks/useIssueCardContext';
import { AutocompleteItem } from '@/Containers/Profile/UpdateAddressScreen';

const NewAddressScreen = () => {
  const { t } = useTranslation();
  const { navigate } =
    useNavigation<StackNavigationProp<IssueCardStackParamTypes, IssueCardScreens.NewAddress>>();
  const { selectedAddress, setSelectedAddress } = useIssueCardContext();
  const { suggestions, isLoading: loading, setSearch } = useAddressSuggestions();
  const ref = useRef(null);

  return (
    <AdminScreenWrapper
      onPrimaryAction={() => {
        navigate(IssueCardScreens.Allocation);
      }}
      primaryActionDisabled={!selectedAddress}
    >
      <View>
        <AutocompleteDropdown
          controller={(controller) => {
            ref.current = controller;
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
              setSelectedAddress({
                streetLine1: selected.primary_line,
                locality: selected.city,
                region: selected.state,
                postalCode: selected.zip_code,
              });
            }
          }}
          onClear={() => setSelectedAddress(null)}
          debounce={600}
          suggestionsListMaxHeight={48 * 5 + 5}
          loading={loading}
          useFilter={false} // prevent rerender twice
          containerStyle={{ flexGrow: 1, flexShrink: 1 }}
          inputContainerStyle={tw`bg-transparent`}
          textInputProps={{
            placeholder: t('profile.updateAddress.placeholder'),
            autoCorrect: false,
            autoCapitalize: 'none',
            style: tw`bg-transparent text-2xl text-black pt-8 font-telegraf p-0 m-0`,
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
          renderItem={(item) => (
            <View style={tw`flex justify-center h-12`}>
              <Text style={tw`px-4`} allowFontScaling={false}>
                {item.title}
              </Text>
            </View>
          )}
          inputHeight={50}
          showChevron={false}
        />
        <TextInput
          style={tw`bg-transparent text-2xl text-black pt-8 font-telegraf p-0 m-0`}
          value={selectedAddress?.streetLine2}
          placeholder={t('profile.updateAddress.line2Placeholder')}
          placeholderTextColor={tw.color('secondary-disabled')}
          onChangeText={(streetLine2) => setSelectedAddress({ ...selectedAddress, streetLine2 })}
          maxFontSizeMultiplier={getFontSizeMultiplier()}
        />
      </View>
    </AdminScreenWrapper>
  );
};

export default NewAddressScreen;
