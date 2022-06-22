import { gql } from "@apollo/client";
import { ProductFields, PageInfoFields } from "../fragments";


const GET_PRODUCTS_QUERY = gql`
  ${ProductFields}
  ${PageInfoFields}
  query GetProducts($query: String) {
    products(
      first: $maxOrders
      query: $query
      sortKey: CREATED_AT
      reverse: true
    ) {
      edges {
        node {
          ...ProductFields
        }
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
`;

export default GET_PRODUCTS_QUERY;
