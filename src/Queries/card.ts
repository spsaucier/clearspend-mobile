import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import {
  Card,
  CardDetailsResponse,
  RevealCardRequest,
  RevealCardResponse,
  UpdateCardStatusRequest,
} from '@/generated/capital';
import apiClient from '@/Services';

const getCards = () => apiClient.get('/users/cards').then((res) => res.data);
export const useUserCards = () => useQuery<CardDetailsResponse[], Error>('cards', getCards);

const getCard = (cardId: string) => apiClient.get(`/users/cards/${cardId}`).then((res) => res.data);
export const useCard = (cardId = '') =>
  useQuery<CardDetailsResponse, Error>(['cards', cardId], () => getCard(cardId));

interface OnMutateProps {
  updatedCard: any;
  queryClient: QueryClient;
  cardId: string;
}
const onMutateFreeze = async ({ queryClient, cardId }: OnMutateProps) => {
  await queryClient.cancelQueries('cards');
  const previousCards = queryClient.getQueryData('cards');
  queryClient.setQueryData('cards', (old: CardDetailsResponse[] | undefined) => {
    const index = old!.findIndex((c) => c.card.cardId === cardId);
    const updated = [...old!];
    if (index) {
      const newStatus = updated[index].card.status === 'INACTIVE' ? 'ACTIVE' : 'INACTIVE';
      updated[index].card.status = newStatus;
    }
    return updated;
  });
  return { previousCards };
};

export const useFreezeCard = (
  cardId = '',
  status = 'INACTIVE',
  statusReason = 'CARDHOLDER_REQUESTED',
) => {
  const queryClient = useQueryClient();
  return useMutation<Card, Error>(
    () =>
      apiClient
        .patch(`/users/cards/${cardId}/block`, { status, statusReason })
        .then((res) => res.data),
    {
      onMutate: async (updatedCard) => onMutateFreeze({ updatedCard, queryClient, cardId }),
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, updatedCard, context: any) => {
        queryClient.setQueryData('cards', context.previousCards);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries('cards');
      },
    },
  );
};

export const useUnFreezeCard = (
  cardId = '',
  status = 'ACTIVE',
  statusReason = 'CARDHOLDER_REQUESTED',
) => {
  const queryClient = useQueryClient();
  return useMutation<Card, Error>(
    () =>
      apiClient
        .patch(`/users/cards/${cardId}/unblock`, { status, statusReason })
        .then((res) => res.data),
    {
      onMutate: async (updatedCard) => onMutateFreeze({ updatedCard, queryClient, cardId }),
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, updatedCard, context: any) => {
        queryClient.setQueryData('cards', context.previousCards);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries('cards');
      },
    },
  );
};

export const useActivateCard = () => {
  const queryClient = useQueryClient();
  return useMutation<Card, AxiosError, { lastFour: string } & UpdateCardStatusRequest>(
    ({ lastFour, statusReason = 'CARDHOLDER_REQUESTED' }) =>
      apiClient.patch('/users/cards/activate', { lastFour, statusReason }).then((res) => res.data),
    {
      // TODO may not be needed if handled in component
      onError: (err, updatedCard, context: any) => {},
      // Refetch cards if a card was activated successfully
      onSuccess: () => {
        queryClient.invalidateQueries('cards');
      },
    },
  );
};

export async function revealCardKey(params: Readonly<RevealCardRequest>) {
  return (await apiClient.post<Readonly<RevealCardResponse>>('/cards/reveal', params)).data;
}
