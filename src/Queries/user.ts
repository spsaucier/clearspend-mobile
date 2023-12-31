import { useMutation, useQuery, useQueryClient } from 'react-query';
import FullStory from '@fullstory/react-native';
import {
  UpdateUserRequest,
  UpdateUserResponse,
  User,
  CreateUserResponse,
  CreateUserRequest,
} from '@/generated/capital';
import apiClient from '@/Services';

export const useUser = () =>
  useQuery<User, Error>('user', () =>
    apiClient.get('/users').then((res) => {
      const { data } = res;
      FullStory.setUserVars({
        displayName: `${data.firstName} ${data.lastName}`,
        ...data,
      });
      return data;
    }),
  );

export const useUserById = (id: string) =>
  useQuery<User, Error>(['user', { id }], () => apiClient.get(`/users/${id}`).then((r) => r.data));

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

export const useUsers = () =>
  useQuery<User[], Error>(['users'], () => apiClient.get(`/users/list`).then((res) => res.data));

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateUserResponse, Error, CreateUserRequest>(
    (context) => apiClient.post(`/users`, context).then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries('users'),
    },
  );
};
