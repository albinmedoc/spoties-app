import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { GET_MINIMAL_ORDERS_QUERY } from "@client/graphql";
import { getNodesFromConnections } from "@client/utilities/graphql";
import type { PagedResult, QueryMinimalOrder, MinimalOrder } from "@types";

interface Parameters {
  query?: string;
  maxOrders?: number;
}

const useMinimalOrders = (
  { query = "", maxOrders = 20 }: Parameters = {},
  deps = []
) => {
  const { data, loading } = useQuery<{orders: PagedResult<QueryMinimalOrder>}>(GET_MINIMAL_ORDERS_QUERY, {
    variables: { query, maxOrders },
    fetchPolicy: "network-only",
  });

  // eslint-disable-next-line no-console
  console.log(data)

  const orders: MinimalOrder[] = useMemo(() => {
    if (loading || !data) {
      return [];
    }

    const nodes = getNodesFromConnections<QueryMinimalOrder>(data.orders);

    return nodes.map((node) => ({
      ...node,
      totalPrice: node.currentSubtotalPriceSet.shopMoney.amount
    }));
  }, [loading, data]);

  const previousCursor = useMemo(() => data && data.orders.pageInfo.hasPreviousPage
      ? data.orders.pageInfo.startCursor
      : null, [data]);

  const nextCursor = useMemo(() => data && data.orders.pageInfo.hasNextPage
      ? data.orders.pageInfo.endCursor
      : null, [data]);

  return useMemo(
    () => ({ orders, loading, previousCursor, nextCursor }),
    [orders, loading, previousCursor, nextCursor, ...deps]
  );
};

export default useMinimalOrders;