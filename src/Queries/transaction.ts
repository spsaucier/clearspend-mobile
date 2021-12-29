import { gql } from '@apollo/client';

export const TRANSACTION_QUERY = gql`
  query TransactionDetailQuery($accountActivityId: ID!) {
    transactionDetail(accountActivityId: $accountActivityId)
      @rest(type: "Transaction", path: "/users/account-activity/{args.accountActivityId}") {
      accountActivityId
      activityTime
      merchant {
        merchantId: merchantNumber
        name
        type
        merchantLogoUrl
        merchantCategoryCode
        merchantLatitude
        merchantLongitude
      }
      status
      amount {
        currency
        amount
      }
      country
      receipt {
        receiptId
      }
      note
    }
  }
`;

export const CARD_TRANSACTIONS_QUERY = gql`
  query TransactionsQuery($cardId: String!, $pageNumber: Number!, $pageSize: Number!) {
    transactions(cardId: $cardId, pageNumber: $pageNumber, pageSize: $pageSize)
      @rest(
        type: "Transactions"
        path: "/users/cards/{args.cardId}/account-activity?pageNumber={args.pageNumber}&pageSize={args.pageSize}"
      ) {
      totalElements
      totalPages
      size
      content {
        accountActivityId
        activityTime
        merchant {
          name
          type
          merchantLogoUrl
          merchantCategoryCode
        }
        amount {
          currency
          amount
        }
        status
        receipt {
          receiptId
        }
      }
    }
  }
`;
