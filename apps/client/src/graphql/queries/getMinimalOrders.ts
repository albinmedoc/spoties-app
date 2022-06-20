import { gql } from "@apollo/client";
import { MinimalOrderFields, PageInfoFields } from "../fragments";


const GET_MINIMAL_ORDERS_QUERY = gql`
  ${MinimalOrderFields}
  ${PageInfoFields}
  query GetMinimalOrders($query: String, $maxOrders: Int) {
    orders(
      first: $maxOrders
      query: $query
      sortKey: CREATED_AT
      reverse: true
    ) {
      edges {
        node {
          ...MinimalOrderFields
        }
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
`;

export default GET_MINIMAL_ORDERS_QUERY;
