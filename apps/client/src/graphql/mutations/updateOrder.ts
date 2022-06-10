import { gql } from "@apollo/client";

export const UPDATE_ORDER_QUERY = gql`
  mutation orderUpdate($input: OrderInput!) {
    orderUpdate(input: $input) {
      userErrors {
        field
        message
      }
    }
  }
`;
