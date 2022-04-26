import { useQuery } from 'react-query';
import { AllocationsAndPermissionsResponse } from 'generated/capital';
import apiClient from '@/Services';

export const useAllPermissions = () =>
  useQuery<AllocationsAndPermissionsResponse, Error>(['permissions'], () =>
    apiClient.get(`/roles-and-permissions/allPermissions`).then((res) => res.data),
  );
