import { useBusinessBankAccounts } from '@/Queries/business';

const useBankAccounts = ({ userType }: { userType?: 'EMPLOYEE' | 'BUSINESS_OWNER' }) =>
  useBusinessBankAccounts({
    enabled: userType === 'BUSINESS_OWNER',
  });

export default useBankAccounts;
