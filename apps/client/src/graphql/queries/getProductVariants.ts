import { gql } from "@apollo/client";
import { ProductVariantFields, PageInfoFields } from "../fragments";


const GET_PRODUCT_VARIANTS_QUERY = gql`
  ${ProductVariantFields}
  ${PageInfoFields}
  query GetProductVariants($query: String, $maxProductVariants: Int) {
    orders(
      first: $maxProductVariants
      query: $query
    ) {
      edges {
        node {
          ...ProductVariantFields
        }
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
`;

export default GET_PRODUCT_VARIANTS_QUERY;
