import { gql } from "@apollo/client";

export const GET_ORDER_QUERY = gql`
  query GetOrders($id: ID!, $maxProducts: Int) {
    order(id: $id) {
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
            id
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
`;
