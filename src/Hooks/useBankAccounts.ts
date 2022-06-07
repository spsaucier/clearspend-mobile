import { Allocation } from '@/generated/capital';
import { useBusinessBankAccounts } from '@/Queries/business';
import { getAllocationById } from '@/Helpers/AllocationHelpers';

const useBankAccounts = ({
  allocationId,
  allocations,
  userType,
}: {
  allocationId?: string;
  allocations?: Allocation[];
  userType?: 'EMPLOYEE' | 'BUSINESS_OWNER';
}) => {
  const allocation = getAllocationById(allocationId, allocations);
  const isRoot = !allocation?.parentAllocationId;

  return useBusinessBankAccounts({
    enabled: !!allocation && isRoot && userType === 'BUSINESS_OWNER',
  });
};

export default useBankAccounts;
