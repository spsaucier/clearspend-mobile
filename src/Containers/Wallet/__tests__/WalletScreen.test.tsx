import * as React from 'react';
import { cleanup, waitFor } from '@testing-library/react-native';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { transaction } from '@/Helpers/testing/fixtures/transactions';
import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { createQueryClient } from '@/Helpers/testing/reactQuery';
import WalletScreen from '@/Containers/Wallet/WalletScreen';
import { AuthContext } from '@/Services/Auth/AuthProvider';
import { userCards } from '@/Helpers/testing/fixtures/userCards';
import { MockFeatureFlagsProvider } from '@/Helpers/testing/MockFeatureFlagsProvider';
import { managerAllocationsAndPermissionsResponse } from '@/Helpers/testing/fixtures/permissions';
import { usersResponse } from '@/Helpers/testing/fixtures/user';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/core', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
  useRoute: () => ({
    params: {},
  }),
}));

jest.mock('@stripe/stripe-react-native', () => ({
  isCardInWallet: jest.fn(() => ({
    isInWallet: true,
  })),
  Constants: {
    API_VERSIONS: {
      ISSUING: '3',
    },
  },
  AddToWalletButton: (props: any) => {
    const MockAddToWallet = 'mock-add-to-wallet';
    // @ts-ignore
    return <MockAddToWallet {...props} />;
  },
}));

const server = setupServer(
  rest.get(`/users/cards`, (req, res, ctx) => res(ctx.json(userCards))),
  rest.get(`/roles-and-permissions/allPermissions`, (req, res, ctx) =>
    res(ctx.json(managerAllocationsAndPermissionsResponse)),
  ),
  rest.get(`/users`, (req, res, ctx) => res(ctx.json(usersResponse[0]))),
  rest.get(`/cards/*`, (req, res, ctx) => res(ctx.json(userCards[0]))),
);

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('WalletScreen', () => {
  it('Renders the card carousel', async () => {
    server.use(
      rest.get(`/users/account-activity/${transaction.accountActivityId}`, (req, res, ctx) =>
        res(ctx.json(transaction)),
      ),
    );

    const { getByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <SafeAreaProvider>
        {/* @ts-ignore TODO extract mock auth context */}
        <AuthContext.Provider value={{ authed: true, loggedIn: true }}>
          <MockFeatureFlagsProvider>
            <WalletScreen />
          </MockFeatureFlagsProvider>
        </AuthContext.Provider>
      </SafeAreaProvider>,
    );

    await waitFor(() => expect(getByTestId('walletScreen-cardCarousel')).toBeTruthy());
  });
});
