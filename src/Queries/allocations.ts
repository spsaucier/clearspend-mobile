import { useQuery } from 'react-query';
import { Allocation } from '@/generated/capital';
import apiClient from '@/Services';

export const useAllocations = () =>
  useQuery<Allocation[], Error>('allocations', () =>
    apiClient.get('/businesses/allocations').then((res) => res.data),
  );
