import { gql } from "@apollo/client";
import { ProductFields, ProductVariantFields } from "../fragments";

const GET_PRODUCT_QUERY = gql`
  ${ProductFields}
  ${ProductVariantFields}
  query GetProduct($id: ID!, $maxProductVariants: Int!, $productVariantsQuery: String) {
    product(id: $id) {
      ...ProductFields
    }
    productVariants(
      first: $maxProductVariants
      query: $productVariantsQuery
    ) {
      edges {
        node {
          ...ProductVariantFields
        }
      }
    }
  }
`;

export default GET_PRODUCT_QUERY;
