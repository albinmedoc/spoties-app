import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { GET_PRODUCT_VARIANTS_QUERY } from "@client/graphql";
import { getNodesFromConnections } from "@client/utilities/graphql";
import type { PagedResult, QueryProductVariant, ProductVariant } from "@types";

interface Parameters {
  query?: string;
  maxProductVariants?: number;
}

const useProductVariants = (
  { query = "", maxProductVariants = 20 }: Parameters = {},
  deps = []
) => {
  const { data, loading } = useQuery<{productVariants: PagedResult<QueryProductVariant>}>(GET_PRODUCT_VARIANTS_QUERY, {
    variables: { query, maxProductVariants },
    fetchPolicy: "network-only",
  });

  const productVariants: ProductVariant[] = useMemo(() => {
    if (loading || !data) {
      return [];
    }

    const nodes = getNodesFromConnections<QueryProductVariant>(data.productVariants);

    return nodes.map((node) => ({
      ...node,
    }));
  }, [loading, data]);

  const previousCursor = useMemo(() => data && data.productVariants.pageInfo.hasPreviousPage
      ? data.productVariants.pageInfo.startCursor
      : null, [data]);

  const nextCursor = useMemo(() => data && data.productVariants.pageInfo.hasNextPage
      ? data.productVariants.pageInfo.endCursor
      : null, [data]);

  return useMemo(
    () => ({ productVariants, loading, previousCursor, nextCursor }),
    [productVariants, loading, previousCursor, nextCursor, ...deps]
  );
};

export default useProductVariants;