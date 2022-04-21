import { useQuery } from 'react-query';
import { AllocationsAndPermissionsResponse } from 'generated/capital';
import apiClient from '@/Services';

export const useAllPermissions = (businessId: string | undefined) =>
  useQuery<AllocationsAndPermissionsResponse, Error>(
    ['permissions', { id: businessId }],
    () =>
      apiClient.get(`/roles-and-permissions/allPermissions/${businessId}`).then((res) => res.data),
    { enabled: !!businessId },
  );
