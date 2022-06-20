import { gql } from "@apollo/client";

export default gql`
    fragment LineItemFields on LineItem {
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
`;