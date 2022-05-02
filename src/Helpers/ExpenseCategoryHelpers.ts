import { ExpenseCategory } from '@/generated/capital';

export const getExpenseCategoryStatus = (
  expenseCategoryId: string | undefined | null,
  expenseCategories: ExpenseCategory[] | undefined,
): string | undefined | null => {
  if (!expenseCategories || !expenseCategoryId) {
    return null;
  }

  const foundCategory = expenseCategories.find((c) => c.expenseCategoryId === expenseCategoryId);

  if (!foundCategory) {
    return null;
  }

  return foundCategory.status;
};
