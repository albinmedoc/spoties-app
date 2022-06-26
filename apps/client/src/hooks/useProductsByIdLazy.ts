import { useLazyQuery } from "@apollo/client";
import { useMemo } from "react";
import { GET_PRODUCTS_BY_ID_QUERY } from "@client/graphql";
import type { QueryProduct, Product, NodeConnection, QueryProductVariant, ProductVariant } from "@types";
import { getNodesFromConnections } from "@client/utilities/graphql";

interface Variables {
  ids: string[];
  productVariantsQuery: string;
  maxProductVariants: number;
}

const useProductsByIdLazy = (): [
  (variables: Omit<Variables, "productVariantsQuery">) => Promise<Product[]>,
  {
    products: Product[];
    loading: boolean;
  }
] => {
  const [trigger, { data, loading }] = useLazyQuery<{ nodes: QueryProduct[], productVariants: NodeConnection<QueryProductVariant> }, Variables>(GET_PRODUCTS_BY_ID_QUERY, {
    fetchPolicy: "network-only",
  });

  const convertQueryDataToProducts = (queryData: { nodes: QueryProduct[], productVariants: NodeConnection<QueryProductVariant> }): Product[] => {
    const variants = getNodesFromConnections<ProductVariant>(queryData.productVariants)

    return queryData.nodes.map((product) => ({
      ...product,
      variants: variants.filter((variant) => variant.product.id === product.id)
    }));
  }

  const products: Product[] = useMemo(() => {
    if (loading || !data) {
      return [];
    }

    return convertQueryDataToProducts(data);
  }, [loading, data]);

  const loadProducts = useMemo(() => (variables: Omit<Variables, "productVariantsQuery">) => trigger({variables: {
      ...variables,
      productVariantsQuery: variables.ids.map((id) => `product_id=${id}`).join(' OR ')
    }}).then((queryResult) => convertQueryDataToProducts(queryResult.data)), [trigger]);

  return [loadProducts, { products, loading }];
};

export default useProductsByIdLazy;