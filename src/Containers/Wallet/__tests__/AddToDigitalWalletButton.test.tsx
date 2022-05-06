import React from 'react';
import { waitFor } from '@testing-library/react-native';

import { setupServer } from 'msw/node';
import { rest } from 'msw';

// @ts-ignore
import mockStripe from '@stripe/stripe-react-native/jest/mock';

import { renderComponentWithQueryClient } from '@/Helpers/testing/WithQueryClient';
import { createQueryClient } from '@/Helpers/testing/reactQuery';

import { AddToDigitalWalletButton } from '@/Containers/Wallet/Components/AddToDigitalWalletButton';

const TEST_CARDHOLDER = 'Susan Spendy';
const TEST_LAST_4_NOT_IN_WALLET = '9955';
const TEST_LAST_4_IN_WALLET = '1234';
const TEST_CARD_ID = 'id-223232ff';
const TEST_KEY_RESPONSE = {
  id: 'ephkey_key',
  object: 'ephemeral_key',
  associated_objects: [
    {
      type: 'issuing.card',
      id: 'ic_id',
    },
  ],
  created: 1651545012,
  expires: 1651548612,
  livemode: false,
  secret: 'ek_test_secret',
};

jest.mock('@stripe/stripe-react-native', () => ({
  ...mockStripe,
  isCardInWallet: jest.fn(({ cardLastFour }) => ({
    isInWallet: cardLastFour !== TEST_LAST_4_NOT_IN_WALLET,
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

const server = setupServer();

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('Add To Digital Wallet Button', () => {
  it('Checks card wallet state, fetches key, renders button', async () => {
    server.use(
      rest.post(`*/cards/ephemeral-key`, (req, res, ctx) => res(ctx.json(TEST_KEY_RESPONSE))),
    );

    const { findByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <AddToDigitalWalletButton
        card={{ cardId: TEST_CARD_ID, lastFour: TEST_LAST_4_NOT_IN_WALLET }}
        cardHolderName={TEST_CARDHOLDER}
        disabled={false}
      />,
    );

    const result = await findByTestId('add-to-digital-wallet-button');

    expect(result).toBeTruthy();

    expect(result.props.cardHolderName).toEqual(TEST_CARDHOLDER);
    expect(result.props.cardLastFour).toEqual(TEST_LAST_4_NOT_IN_WALLET);
    expect(result.props.ephemeralKey).toEqual(TEST_KEY_RESPONSE);
  });

  it("Doesn't display the add to wallet button or request a key when the card is already in the wallet", async () => {
    const { queryByTestId } = renderComponentWithQueryClient(
      createQueryClient(),
      <AddToDigitalWalletButton
        card={{ cardId: TEST_CARD_ID, lastFour: TEST_LAST_4_IN_WALLET }}
        cardHolderName={TEST_CARDHOLDER}
        disabled={false}
      />,
    );

    const result = queryByTestId('add-to-digital-wallet-button');

    await waitFor(() => expect(result).toBeFalsy());
  });
});
