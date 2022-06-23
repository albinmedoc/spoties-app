import { gql } from "@apollo/client";
import { ProductFields, PageInfoFields } from "../fragments";


const GET_MINIMAL_PRODUCTS_QUERY = gql`
  ${ProductFields}
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
          ...ProductFields
        }
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
`;

export default GET_MINIMAL_PRODUCTS_QUERY;
