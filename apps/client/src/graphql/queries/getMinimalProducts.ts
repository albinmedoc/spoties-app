import { gql } from "@apollo/client";
import { MinimalProductFields, PageInfoFields } from "../fragments";


const GET_MINIMAL_PRODUCTS_QUERY = gql`
  ${MinimalProductFields}
  ${PageInfoFields}
  query GetProducts($query: String, $maxProducts: Int) {
    products(
      first: $maxProducts
      query: $query
      sortKey: CREATED_AT
      reverse: true
    ) {
      edges {
        node {
          ...MinimalProductFields
        }
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
`;

export default GET_MINIMAL_PRODUCTS_QUERY;
