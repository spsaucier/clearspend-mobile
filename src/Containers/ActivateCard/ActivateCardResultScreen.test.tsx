import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { renderHook, act } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClientProvider } from 'react-query';

import { useActivateCard } from '@/Queries/card';
import { ActivateCardResultScreen } from '@/Containers/ActivateCard/ActivateCardResultScreen';
import { WalletScreens } from '@/Navigators/Wallet/WalletNavigatorTypes';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';

jest.mock('@/Assets/Images/blank-physical-chip-card.png');

const mockedNavigate = jest.fn(() => ({
  goBack: jest.fn(),
}));
jest.mock('@react-navigation/core', () => {
  const actualNav = jest.requireActual('@react-navigation/core');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Activate Card Result Screen', () => {
  // TODO improve mock and test errors as well
  const server = setupServer(
    rest.patch('*/users/cards/activate', (req, res, ctx) =>
      res(
        ctx.body({
          cardId: 'mock-card-id',
        }),
      ),
    ),
  );

  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'error',
    });
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Activate card hook returns success', async () => {
    const queryClient = createQueryClient();

    const wrapper = ({ children }: any) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result, waitForValueToChange } = renderHook(() => useActivateCard(), {
      wrapper,
    });

    act(() => {
      result.current.mutate({ lastFour: '1111' });
    });

    await waitForValueToChange(() => result.current.isSuccess, { interval: 1000 });
  });

  it('A successful activate card response displays pressable return to wallet button', async () => {
    const result = renderComponentWithQueryClient(
      createQueryClient(),
      <ActivateCardResultScreen
        // @ts-ignore
        navigation={mockedNavigate}
        // @ts-ignore
        route={{ params: { lastFour: '7727' } }}
      />,
    );

    const returnToWalletButton = await result.findByText('activateCard.viewCardsButtonCta');

    act(() => {
      fireEvent.press(returnToWalletButton);
    });

    expect(mockedNavigate).toHaveBeenCalledWith(WalletScreens.Home, {
      initialFocusedCardId: 'mock-card-id',
    });
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });

  it('Navigates back on error', async () => {
    server.use(rest.patch('*/users/cards/activate', (req, res, ctx) => res(ctx.status(500))));

    const result = renderComponentWithQueryClient(
      createQueryClient(),
      <ActivateCardResultScreen
        // @ts-ignore
        navigation={mockedNavigate}
        // @ts-ignore
        route={{ params: { lastFour: '2242' } }}
      />,
    );

    const loadingText = await result.findByText('activateCard.loadingTitle');
    expect(loadingText).toBeTruthy();
    expect(result.queryByText('activateCard.viewCardsButtonCta')).toBeFalsy();
  });
});
