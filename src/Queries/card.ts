import {
  QueryClient,
  QueryObserverResult,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from 'react-query';
import { useMemo } from 'react';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import {
  Card,
  CardDetailsResponse,
  RevealCardRequest,
  RevealCardResponse,
  UpdateCardStatusRequest,
  IssueCardRequest,
  IssueCardResponse,
  User,
  SearchCardData,
} from '@/generated/capital';
import apiClient from '@/Services';

const EMPLOYEE_CARDS_KEY = 'employee-cards';
const CARDS_BY_ID_KEY = 'cards';

export const invalidateCardQueries = async (queryClient: QueryClient) =>
  Promise.all([
    queryClient.invalidateQueries(CARDS_BY_ID_KEY),
    queryClient.invalidateQueries(EMPLOYEE_CARDS_KEY),
  ]);

const getUserCards = () => apiClient.get('/users/cards').then((res) => res.data);
export const useUserCards = (enabled: boolean) =>
  useQuery<CardDetailsResponse[], Error>(CARDS_BY_ID_KEY, getUserCards, { enabled });

export const useEmployeeCardsSearch = (userId: string, enabled: boolean) =>
  useQuery<SearchCardData[], Error>(
    [EMPLOYEE_CARDS_KEY, userId],
    () =>
      apiClient
        .post('/cards/search', {
          users: [userId],
          pageRequest: {
            orderBy: [
              {
                direction: 'ASC',
                item: 'activationDate',
              },
            ],
            //  TODO fetch all pages
            pageNumber: 0,
            pageSize: 50,
          },
        })
        .then((res) => res.data.content),
    { enabled },
  );

export const useEmployeeCards = (
  employee?: User,
): {
  isLoading: boolean;
  isError: boolean;
  data: CardDetailsResponse[] | undefined;
  refetch: () => Promise<QueryObserverResult<SearchCardData[], Error>>;
  isRefetching: boolean;
} => {
  const employeeId = employee?.userId ?? '';
  const shouldFetchEmployee = Boolean(employee);

  const {
    data: searchCardsData,
    isLoading: searchCardsLoading,
    isError: searchCardsError,
    refetch,
    isRefetching,
  } = useEmployeeCardsSearch(employeeId, shouldFetchEmployee);

  const cardIds = useMemo(
    () => searchCardsData?.map((card) => card.cardId).filter(Boolean) ?? [],
    [searchCardsData],
    // Undefined IDs have been filtered out
  ) as string[];

  const cardQueries = useQueries(
    cardIds.map((id) => ({
      queryKey: [CARDS_BY_ID_KEY, id],
      queryFn: () => getCard(id),
      enabled: Boolean(searchCardsData),
    })),
  );

  const employeeCards = useMemo(
    () => cardQueries?.map((query) => query.data).filter(Boolean) ?? [],
    [cardQueries],
  );

  const isLoading = useMemo(
    () => searchCardsLoading || cardQueries?.some((query) => query.isLoading),
    [cardQueries, searchCardsLoading],
  );
  const isError = useMemo(
    () => searchCardsError || cardQueries?.some((query) => query.isError),
    [cardQueries, searchCardsError],
  );

  return {
    isLoading,
    isError,
    data: employeeCards,
    refetch,
    isRefetching,
  };
};

const getCard = (cardId: string) => apiClient.get(`/cards/${cardId}`).then((res) => res.data);
export const useCard = (cardId = '') =>
  useQuery<CardDetailsResponse, Error>([CARDS_BY_ID_KEY, cardId], () => getCard(cardId), {
    enabled: !!cardId,
  });

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
      onSuccess: () => {
        invalidateCardQueries(queryClient);
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
      onSuccess: () => {
        invalidateCardQueries(queryClient);
      },
    },
  );
};

export const useActivateCard = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation<Card, AxiosError, { lastFour: string } & UpdateCardStatusRequest>(
    ({ lastFour, statusReason = 'CARDHOLDER_REQUESTED' }) =>
      apiClient.patch('/users/cards/activate', { lastFour, statusReason }).then((res) => res.data),
    {
      onError: () => {
        Toast.show({ type: 'error', props: { dark: true }, text1: t('activateCard.error') });
      },
      // Refetch cards if a card was activated successfully
      onSuccess: () => {
        invalidateCardQueries(queryClient);
      },
    },
  );
};

export const useCancelCard = () => {
  const queryClient = useQueryClient();
  return useMutation<Card, AxiosError, { cardId: string | undefined } & UpdateCardStatusRequest>(
    ({ cardId, statusReason = 'CARDHOLDER_REQUESTED' }) =>
      apiClient.patch(`users/cards/${cardId}/cancel`, { statusReason }).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cards');
      },
    },
  );
};

export async function revealCardKey(params: Readonly<RevealCardRequest>) {
  return (await apiClient.post<Readonly<RevealCardResponse>>('/cards/reveal', params)).data;
}

export const useSaveCardSpendControl = (cardId: string) =>
  useMutation<
    Card,
    Error,
    {
      disabledMccGroups: string[];
      disabledPaymentTypes: string[];
      limits: any[];
      disableForeign: boolean;
    }
  >((context) => {
    const { disabledMccGroups, disabledPaymentTypes, limits, disableForeign } = context;
    return apiClient
      .patch(`/cards/${cardId}`, {
        disabledMccGroups,
        disabledPaymentTypes,
        limits,
        disableForeign,
      })
      .then((res) => res.data);
  });

export const useIssueCardRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<IssueCardResponse, Error, IssueCardRequest>(
    (context) => apiClient.post(`/cards`, context).then((res) => res.data),
    {
      // Refetch cards if a card was issued successfully
      onSuccess: () => {
        invalidateCardQueries(queryClient);
      },
    },
  );
};
