import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { GET_ORDERS_QUERY } from "@client/graphql";
import { getNodesFromConnections } from "@client/utilities/graphql";
import { converQueryOrderToOrder } from '@client/helpers';
import type { PagedResult, QueryOrder, Order } from "@types";

const useOrders = (
  { query = "", maxOrders = 20, maxProducts = 10 } = {},
  deps = []
) => {
  const { data, loading } = useQuery<{orders: PagedResult<QueryOrder>}>(GET_ORDERS_QUERY, {
    variables: { query, maxOrders, maxProducts },
    fetchPolicy: "network-only",
  });

  // eslint-disable-next-line no-console
  console.log(data)

  const orders: Order[] = useMemo(() => {
    if (loading || !data) {
      return [];
    }

    const queryOrders = getNodesFromConnections<QueryOrder>(data.orders);

    return queryOrders.map((queryOrder) => converQueryOrderToOrder(queryOrder));
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

export default useOrders;