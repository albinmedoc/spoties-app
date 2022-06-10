import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { GET_ORDERS_QUERY } from "@client/graphql";
import { getNodesFromConnections } from "@client/utilities/graphql";

export const useOrders = (
  { query = "", maxOrders = 20, maxProducts = 10 } = {},
  deps = []
) => {
  const { data, loading } = useQuery(GET_ORDERS_QUERY, {
    variables: { query, maxOrders, maxProducts },
    fetchPolicy: "network-only",
  });

  const orders = useMemo(() => {
    if (!data) {
      return [];
    }

    const nodes = getNodesFromConnections(data.orders);

    return nodes.map((node) => ({
      ...node,
      products: getNodesFromConnections(node.lineItems).map((product) => ({
        ...product,
        variant: product.variant?.title,
      })),
    }));
  }, [data]);

  const previousCursor = useMemo(() => {
    return data && data.orders.pageInfo.hasPreviousPage
      ? data.orders.pageInfo.startCursor
      : null;
  }, [data]);

  const nextCursor = useMemo(() => {
    return data && data.orders.pageInfo.hasNextPage
      ? data.orders.pageInfo.endCursor
      : null;
  }, [data]);

  return useMemo(
    () => ({ orders, loading, previousCursor, nextCursor }),
    [orders, loading, previousCursor, nextCursor, ...deps]
  );
};
