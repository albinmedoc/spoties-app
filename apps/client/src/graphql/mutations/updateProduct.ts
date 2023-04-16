import { gql } from "@apollo/client";

const UPDATE_PRODUCT_QUERY = gql`
  mutation productUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      userErrors {
        field
        message
      }
    }
  }
`;

export default UPDATE_PRODUCT_QUERY;
