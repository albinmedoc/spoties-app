import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { GET_MINIMAL_PRODUCTS_QUERY } from "@client/graphql";
import { getNodesFromConnections } from "@client/utilities/graphql";
import type { PagedResult, QueryMinimalProduct, MinimalProduct } from "@types";

interface Parameters {
  query?: string;
  maxProducts?: number;
}

const useMinimalProducts = (
  { query = "", maxProducts = 20 }: Parameters = {},
  deps = []
) => {
  const { data, loading } = useQuery<{products: PagedResult<QueryMinimalProduct>}>(GET_MINIMAL_PRODUCTS_QUERY, {
    variables: { query, maxProducts },
    fetchPolicy: "network-only",
  });

  const products: MinimalProduct[] = useMemo(() => {
    if (loading || !data) {
      return [];
    }

    const nodes = getNodesFromConnections<QueryMinimalProduct>(data.products);

    return nodes.map((node) => ({
      ...node,
      maxPrice: node.priceRangeV2.maxVariantPrice.amount,
      minPrice: node.priceRangeV2.minVariantPrice.amount
    }));
  }, [loading, data]);

  const previousCursor = useMemo(() => data && data.products.pageInfo.hasPreviousPage
      ? data.products.pageInfo.startCursor
      : null, [data]);

  const nextCursor = useMemo(() => data && data.products.pageInfo.hasNextPage
      ? data.products.pageInfo.endCursor
      : null, [data]);

  return useMemo(
    () => ({ products, loading, previousCursor, nextCursor }),
    [products, loading, previousCursor, nextCursor, ...deps]
  );
};

export default useMinimalProducts;