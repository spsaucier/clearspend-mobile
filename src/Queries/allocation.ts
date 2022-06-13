import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  AllocationDetailsResponse,
  CreateAllocationRequest,
  CreateAllocationResponse,
} from '@/generated/capital';
import apiClient from '@/Services';

export const fetchAllocationData = (allocationId: string) =>
  apiClient.get(`/allocations/${allocationId}`).then<AllocationDetailsResponse>((res) => res.data);

export const useAllocation = (allocationId: string) =>
  useQuery<AllocationDetailsResponse, Error>(`allocation_${allocationId}`, () =>
    fetchAllocationData(allocationId),
  );

export const useCreateAllocation = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateAllocationResponse, Error, CreateAllocationRequest>(
    (context) => apiClient.post(`/allocations`, context).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('permissions');
      },
    },
  );
};
