import { gql } from "@apollo/client";
import { ProductFields, ProductVariantFields } from "../fragments";

const GET_PRODUCTS_BY_ID_QUERY = gql`
  ${ProductFields}
  ${ProductVariantFields}
  query GetProductsById($ids: [ID!]!, $productVariantsQuery: String!, $maxProductVariants: Int!) {
    nodes(ids: $ids) {
        ...on Product {
            ...ProductFields
        }
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

export default GET_PRODUCTS_BY_ID_QUERY;
