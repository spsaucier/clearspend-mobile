import React, { forwardRef, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

import { ActivityIndicator, CSText } from '@/Components';
import tw from '@/Styles/tailwind';
import { useExpenseCategories } from '@/Queries/expenseCategory';
import { ExpenseCategory } from '@/generated/capital';
import { FullPageError } from '@/Components/FullPageError';

const AssignCategoryBottomSheet = forwardRef(
  (props: { onSelectCategory: (category: ExpenseCategory) => void }, ref: any) => {
    const { t } = useTranslation();

    const { data: categories, isError } = useExpenseCategories();

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

    const onCategoryPress = (category: ExpenseCategory) => {
      props.onSelectCategory(category);
      (ref?.current as BottomSheetModal)?.dismiss();
    };

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal ref={ref} snapPoints={['100%']} backdropComponent={renderBackdrop}>
          <View style={tw`flex-1 pt-4 px-1`}>
            {!categories ? (
              <View style={tw`flex h-5/6 items-center justify-center`}>
                <ActivityIndicator />
              </View>
            ) : isError ? (
              <FullPageError
                title={t('error.generic')}
                subTitle={t('wallet.transactionDetails.selectCategory.fetchCategoriesError')}
              />
            ) : (
              <>
                <CSText style={tw`text-lg pb-5 pl-5`}>
                  {t('wallet.transactionDetails.selectCategory.title')}
                </CSText>
                <BottomSheetFlatList
                  data={categories}
                  keyExtractor={(item, index) => item?.expenseCategoryId ?? index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={tw`flex-row items-center mb-5 py-0.3`}
                      onPress={() => onCategoryPress(item)}
                    >
                      <CSText>{item.categoryName}</CSText>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={tw`w-full pt-2 px-5`}
                />
              </>
            )}
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  },
);

export default AssignCategoryBottomSheet;
