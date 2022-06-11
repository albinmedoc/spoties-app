import { gql } from "@apollo/client";

const UPDATE_ORDER_QUERY = gql`
  mutation orderUpdate($input: OrderInput!) {
    orderUpdate(input: $input) {
      userErrors {
        field
        message
      }
    }
  }
`;

export default UPDATE_ORDER_QUERY;
