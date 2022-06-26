import { useLazyQuery } from "@apollo/client";
import { useMemo } from "react";
import { GET_PRODUCTS_BY_ID_QUERY } from "@client/graphql";

import type { LazyQueryExecFunction } from "@apollo/client";
import type { QueryProduct, Product, NodeConnection, QueryProductVariant, ProductVariant } from "@types";
import { getNodesFromConnections } from "@client/utilities/graphql";

interface Variables {
  ids: string[];
  productVariantsQuery: string;
  maxProductVariants: number;
}

const useProductsByIdLazy = (): [
  LazyQueryExecFunction<{ nodes: QueryProduct[], productVariants: NodeConnection<QueryProductVariant> }, Variables>,
  {
    products: Product[];
    loading: boolean;
  }
] => {
  const [trigger, { data, loading }] = useLazyQuery<{ nodes: QueryProduct[], productVariants: NodeConnection<QueryProductVariant> }, Variables>(GET_PRODUCTS_BY_ID_QUERY, {
    fetchPolicy: "network-only",
  });

  const products: Product[] = useMemo(() => {
    if (loading || !data) {
      return [];
    }

    const variants = getNodesFromConnections<ProductVariant>(data.productVariants)

    return data.nodes.map((product) => ({
      ...product,
      variants: variants.filter((variant) => variant.product.id === product.id)
    }));
  }, [loading, data]);

  return [trigger, { products, loading }];
};

export default useProductsByIdLazy;