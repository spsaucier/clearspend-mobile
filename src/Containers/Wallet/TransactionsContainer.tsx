import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';
import { isEqual } from 'lodash';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import FilterTransactionsBottomSheet, {
  TransactionFilterOption,
} from '@/Containers/Wallet/Components/FilterTransactionsBottomSheet';
import Transactions from '@/Containers/Wallet/Transactions';
import { useCardTransactions } from '@/Queries';
import { TWSearchInput } from '@/Components/SearchInput';

export const TransactionsContainer = ({
  selectedCardId,
  initialSnapPoint,
}: {
  selectedCardId: string;
  initialSnapPoint: number;
}) => {
  const { t } = useTranslation();
  const filterTransactionBottomSheetRef = useRef<BottomSheetModal>(null);

  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText] = useDebounce(searchText, 200);

  const [selectedFilters, setSelectedFilters] = React.useState<TransactionFilterOption[]>([]);
  const prevSelectedFiltersRef = useRef<TransactionFilterOption[]>();

  const cardTransactionsQuery = useCardTransactions({
    cardId: selectedCardId,
    searchText: debouncedSearchText,
    withoutReceipt: selectedFilters.includes('missingReceipt'),
    missingExpenseCategory: selectedFilters.includes('missingCategory'),
  });

  useEffect(() => {
    setSelectedFilters([]);
    setSearchText('');
  }, [selectedCardId]);

  useEffect(() => {
    if (!isEqual(prevSelectedFiltersRef.current, selectedFilters)) {
      cardTransactionsQuery.refetch();
    }
    prevSelectedFiltersRef.current = selectedFilters;
  }, [cardTransactionsQuery, selectedFilters]);

  const onChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  const toggleFilter = (filter: TransactionFilterOption) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((i) => i !== filter) : [...prev, filter],
    );
  };

  const onSelectFilters = (updatedFilters: TransactionFilterOption[]) => {
    setSelectedFilters(updatedFilters);
  };

  const presentFiltersModal = () => {
    filterTransactionBottomSheetRef?.current?.present();
  };

  return (
    <>
      <Transactions
        cardId={selectedCardId}
        initialSnapPoint={initialSnapPoint}
        presentFiltersModal={presentFiltersModal}
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
        searchInputComponent={
          <TWSearchInput
            value={searchText}
            onChangeText={onChangeSearchText}
            placeholder={t('wallet.transactions.searchTransactions')}
          />
        }
        cardTransactionsQuery={cardTransactionsQuery}
        displayResultCount={searchText.length > 0 || selectedFilters.length > 0}
      />
      <FilterTransactionsBottomSheet
        ref={filterTransactionBottomSheetRef}
        selectedFilters={selectedFilters}
        onSelectFilters={onSelectFilters}
      />
    </>
  );
};
