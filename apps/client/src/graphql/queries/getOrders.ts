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
          displayAddress {
            formatted(withName: true, withCompany: true)
          }
          customer {
            firstName
            lastName
          }
          currentSubtotalPriceSet {
            shopMoney {
              amount
            }
          }
          lineItems(first: $maxProducts) {
            edges {
              node {
                title
                variant {
                  title
                }
                currentQuantity
                image {
                  altText
                  url
                }
                customAttributes {
                  key
                  value
                }
              }
            }
          }
          tags
          displayFulfillmentStatus
          fulfillments {
            trackingInfo {
              number
            }
          }
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
