import { useQuery } from 'react-query';
import { User } from '@/generated/capital';
import apiClient from '@/Services';

export const useUser = () =>
  useQuery<User, Error>('user', () => apiClient.get('/users').then((res) => res.data));
