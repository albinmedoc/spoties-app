import { gql } from "@apollo/client";

export default gql`
    fragment MinimalOrderFields on Order {
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
`;