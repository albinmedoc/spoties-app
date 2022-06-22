import { gql } from "@apollo/client";

export default gql`
    fragment ProductFields on Product {
        id
        featuredImage{
            altText
            url
        }
        priceRangeV2 {
            maxVariantPrice {
                amount
            }
            minVariantPrice {
                amount
            }
        }
        status
        title
        totalVariants
    }
`;