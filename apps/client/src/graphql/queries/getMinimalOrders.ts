import { gql } from "@apollo/client";

const GET_ORDERS_QUERY = gql`
  query GetOrders($query: String, $maxOrders: Int, $maxProducts: Int) {
    orders(
      first: $maxOrders
      query: $query
      sortKey: CREATED_AT
      reverse: true
    ) {
      edges {
        node {
          id
          name
          createdAt
          customer {
            firstName
            lastName
          }
          currentSubtotalPriceSet {
            shopMoney {
              amount
            }
          }
          tags
          displayFulfillmentStatus
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export default GET_ORDERS_QUERY;
