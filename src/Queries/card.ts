import { gql } from '@apollo/client';

export const USER_CARDS_QUERY = gql`
  query UserCardsQuery {
    cards @rest(type: "Card", path: "/users/cards") {
      card {
        cardId
        expirationDate
        cardNumber
        lastFour
        cardLine3
        cardLine4
        type
        address {
          streetLine1
          streetLine2
          locality
          region
          postalCode
          country
        }
        status
      }
      availableBalance {
        currency
        amount
      }
      allocationName
    }
  }
`;

export const CARD_QUERY = gql`
  query CardQuery($cardId: String!) {
    cardDetails(cardId: $cardId) @rest(type: "Card", path: "/users/cards/{args.cardId}") {
      card {
        cardId
        expirationDate
        cardNumber
        lastFour
        cardLine3
        cardLine4
        type
        address {
          streetLine1
          streetLine2
          locality
          region
          postalCode
          country
        }
        status
      }
      availableBalance {
        currency
        amount
      }
      allocationName
    }
  }
`;

export const FREEZE_CARD_MUTATION = gql`
  mutation freezeCard($cardId: ID!, $reasonBody: PublishablePostInput!) {
    freezeCardResponse: freeze(input: "Foo", cardId: $cardId, body: $reasonBody)
      @rest(
        type: "FreezeCard"
        path: "/users/cards/{args.cardId}/block"
        method: "PATCH"
        bodyKey: "body"
      ) {
      status
      statusReason
    }
  }
`;

export const UNFREEZE_CARD_MUTATION = gql`
  mutation unfreezeCard($cardId: ID!, $reasonBody: PublishablePostInput!) {
    unfreezeCardResponse: unfreeze(input: "Foo", cardId: $cardId, body: $reasonBody)
      @rest(
        type: "UnFreezeCard"
        path: "/users/cards/{args.cardId}/unblock"
        method: "PATCH"
        bodyKey: "body"
      ) {
      status
      statusReason
    }
  }
`;
