import React, { forwardRef, useCallback, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

import { CSText } from '@/Components';
import tw from '@/Styles/tailwind';
import * as categoryIcons from '@/Components/Icons/Categories';

const AssignCategoryBottomSheet = forwardRef(
  (props: { onSelectCategory: (category: any) => void }, ref: any) => {
    const { t } = useTranslation();

    // TODO temp getting categories from file structure
    const categories = useMemo(
      () =>
        Object.entries(categoryIcons).map(([name, CategoryIcon]) => ({
          categoryName: name.slice(0, name.length - 4),
          CategoryIcon,
        })),
      [],
    );

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

    const onCategoryPress = (category: any) => {
      props.onSelectCategory(category);
      (ref?.current as BottomSheetModal)?.dismiss();
    };

    return (
      <BottomSheetModalProvider>
        <BottomSheetModal ref={ref} snapPoints={['100%']} backdropComponent={renderBackdrop}>
          <View style={tw`flex-1 pt-4 px-1`}>
            <CSText style={tw`text-lg pb-5 pl-5`}>{t('wallet.transactions.selectCategory')}</CSText>

            <BottomSheetFlatList
              data={categories}
              keyExtractor={(item) => item.categoryName}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={tw`flex-row items-center mb-5`}
                  onPress={() => onCategoryPress(item)}
                >
                  <item.CategoryIcon style={tw`mr-3`} size={24} />
                  <CSText>{item.categoryName}</CSText>
                </TouchableOpacity>
              )}
              contentContainerStyle={tw`w-full pt-2 px-5`}
            />
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    );
  },
);

export default AssignCategoryBottomSheet;
