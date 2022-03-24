import apiClient from '@/Services';

export const acceptTermsAndConditions = (accessToken: string) =>
  apiClient.patch(
    `/terms-and-conditions`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
