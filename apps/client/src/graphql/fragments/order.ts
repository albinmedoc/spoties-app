import { gql } from "@apollo/client";

import LineItemFields from './lineItem';

export default gql`
    ${LineItemFields}
    fragment OrderFields on Order {
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
                    ...LineItemFields
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
`;