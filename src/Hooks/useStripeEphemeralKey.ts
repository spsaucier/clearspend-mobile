import { useMutation } from 'react-query';
import apiClient from '@/Services';

export const useStripeEphemeralKey = () =>
  useMutation<any, Error, { apiVersion: string; cardId: string }>((context) => {
    const { apiVersion, cardId } = context;
    return apiClient.post(`/cards/ephemeral-key`, { apiVersion, cardId }).then((res) => res.data);
  });
