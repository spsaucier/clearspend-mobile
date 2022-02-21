import { useQuery } from 'react-query';
import apiClient from '@/Services';
import { ExpenseCategory } from '@/generated/capital';

export const useExpenseCategories = () =>
  useQuery<ExpenseCategory[], Error>(['expense-categories'], () =>
    apiClient.get('/expense-categories/list').then((res) => res.data),
  );
