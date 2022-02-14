import { useMutation, useQuery, useQueryClient } from 'react-query';
import { UpdateUserRequest, UpdateUserResponse, User } from '@/generated/capital';
import apiClient from '@/Services';

export const useUser = () =>
  useQuery<User, Error>('user', () => apiClient.get('/users').then((res) => res.data));

export const updateUser = (user: User) =>
  apiClient.patch(`/users/${user.userId}`, { ...user }).then((r) => r.data);

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<UpdateUserResponse, Error, UpdateUserRequest>(
    (data: User) => updateUser(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    },
  );
};
