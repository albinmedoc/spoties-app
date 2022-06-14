import { gql } from "@apollo/client";

const GET_ORDER_QUERY = gql`
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
            variantTitle
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

export default GET_ORDER_QUERY;
