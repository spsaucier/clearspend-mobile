import React, { forwardRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { isEqual } from 'lodash';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { BackButtonNavigator, CSText, Button } from '@/Components';
import tw from '@/Styles/tailwind';

export type TransactionFilterOption = 'missingReceipt' | 'missingCategory';

const filterOptions: TransactionFilterOption[] = ['missingReceipt', 'missingCategory'];

type Props = {
  selectedFilters: TransactionFilterOption[];
  onSelectFilters: (filters: TransactionFilterOption[]) => void;
};

const FilterTransactionsBottomSheet = forwardRef(
  ({ selectedFilters, onSelectFilters }: Props, ref: any) => {
    const { t } = useTranslation();
    const [localFilterItems, setLocalFilterItems] = React.useState<TransactionFilterOption[]>([]);

    useEffect(() => {
      setLocalFilterItems(selectedFilters);
    }, [selectedFilters]);

    const toggleLocalFilter = (filter: TransactionFilterOption) => {
      setLocalFilterItems((prev) =>
        prev.includes(filter) ? prev.filter((i) => i !== filter) : [...prev, filter],
      );
    };

    const resetFilters = () => {
      if (!isEqual(selectedFilters, localFilterItems)) {
        setLocalFilterItems(selectedFilters);
      }
    };

    const resetFiltersAndClose = () => {
      resetFilters();
      (ref?.current as BottomSheetModal)?.dismiss();
    };

    const clearFilters = () => {
      setLocalFilterItems([]);
    };

    const applyFiltersAndClose = () => {
      onSelectFilters(localFilterItems);
      (ref?.current as BottomSheetModal)?.dismiss();
    };

    const renderBackdrop = useCallback(
      ({ animatedIndex, animatedPosition }: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          animatedIndex={animatedIndex}
          animatedPosition={animatedPosition}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="close"
          enableTouchThrough={false}
        />
      ),
      [],
    );

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={ref}
          snapPoints={['100%']}
          backdropComponent={renderBackdrop}
          backgroundStyle={tw`bg-white`}
          handleStyle={[tw`flex self-center bg-transparent w-12 rounded-full mt-1 mb-3`]}
          handleIndicatorStyle={tw`bg-black-20 w-14 h-1`}
          onDismiss={resetFilters}
        >
          <View style={tw`flex-1 px-1`}>
            <View style={tw`ml-5 flex-row items-center`}>
              <BackButtonNavigator onBackPress={resetFiltersAndClose} />
              <CSText style={tw`ml-6 text-base`}>
                {t('wallet.filterTransactions.filterTransactionsBy')}
              </CSText>
            </View>

            <View style={tw`flex-row mt-10`}>
              {filterOptions.map((filter) => (
                <TouchableOpacity
                  style={[
                    tw`rounded-full ml-5 pl-3 pr-3 pt-3 pb-3 bg-gray-5`,
                    localFilterItems.includes(filter) ? tw`bg-secondary` : tw`bg-gray-5`,
                  ]}
                  onPress={() => toggleLocalFilter(filter)}
                  key={filter}
                >
                  <CSText
                    style={[
                      tw`text-sm`,
                      localFilterItems.includes(filter) ? tw`text-white` : tw`text-black`,
                    ]}
                  >
                    {t(`wallet.filterTransactions.${filter}`)}
                  </CSText>
                </TouchableOpacity>
              ))}
            </View>
            <Button
              containerStyle={[
                tw`ml-4 w-90 bg-gray-5 absolute bottom-32`,
                localFilterItems?.length > 0 ? tw`bg-primary` : tw`bg-gray-5`,
              ]}
              label={t('wallet.filterTransactions.applyFilterButtonCta')}
              onPress={applyFiltersAndClose}
            />

            <Button
              containerStyle={tw`ml-4 w-90 bg-white absolute bottom-12`}
              label={t('wallet.filterTransactions.resetAllFiltersCta')}
              onPress={clearFilters}
            />
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  },
);

export default FilterTransactionsBottomSheet;
