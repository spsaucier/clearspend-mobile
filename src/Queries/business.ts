import { useQuery } from 'react-query';
import { Business } from '@/generated/capital';
import apiClient from '@/Services';

export const useBusiness = () =>
  useQuery<Business, Error>('business', () => apiClient.get('/businesses').then((res) => res.data));
