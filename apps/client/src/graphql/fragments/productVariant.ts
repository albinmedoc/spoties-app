import { gql } from "@apollo/client";

export default gql`
    fragment ProductVariantFields on ProductVariant {
        displayName
        id
        image {
            url
            altText
        }
        price
        product {
            id
        };
        sku
    }
`;