import { useQuery } from 'react-query';
import { AllocationDetailsResponse } from '@/generated/capital';
import apiClient from '@/Services';

export const fetchAllocationData = (allocationId: string) =>
  apiClient.get(`/allocations/${allocationId}`).then<AllocationDetailsResponse>((res) => res.data);

export const useAllocation = (allocationId: string) =>
  useQuery<AllocationDetailsResponse, Error>(`allocation_${allocationId}`, () =>
    fetchAllocationData(allocationId),
  );
