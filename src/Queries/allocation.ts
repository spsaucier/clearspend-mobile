import { AllocationDetailsResponse } from '@/generated/capital';
import apiClient from '@/Services';

export const fetchAllocationData = (allocationId: string) =>
  apiClient.get(`/allocations/${allocationId}`).then<AllocationDetailsResponse>((res) => res.data);
