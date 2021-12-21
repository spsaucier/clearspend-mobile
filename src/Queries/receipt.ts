import { gql } from '@apollo/client';

export const UPLOAD_RECEIPT_MUTATION = gql`
  mutation UploadReceipt($customBody: any) {
    uploadedReceipt: upload(body: $customBody)
      @rest(
        type: "UploadReceipt"
        path: "/images/receipts"
        method: "POST"
        bodyKey: "body"
        bodySerializer: "formData"
      ) {
      receiptId
    }
  }
`;

export const LINK_RECEIPT_MUTATION = gql`
  mutation LinkReceipt($input: any) {
    linkedReceipt: link(input: $input)
      @rest(
        type: "LinkedReceipt"
        path: "/users/account-activity/{args.input.accountActivityId}/receipts/{args.input.receiptId}/link"
        method: "POST"
      ) {
      NoResponse
    }
  }
`;
