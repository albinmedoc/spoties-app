import { gql } from "@apollo/client";
import { ProductFields } from "../fragments";

const GET_PRODUCT_QUERY = gql`
  ${ProductFields}
  query GetProduct($id: ID!) {
    product(id: $id) {
      ...ProductFields
    }
  }
`;

export default GET_PRODUCT_QUERY;
