import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { GET_ORDERS_BY_ID_QUERY } from "@client/graphql";
import { convertQueryOrderToOrder } from '@client/helpers';
import type { QueryOrder, Order } from "@types";

interface Parameters {
    ids: string[];
    maxProducts?: number;
}

const useOrdersById = (
  { ids, maxProducts = 20 }: Parameters
) => {
  const { data, loading } = useQuery<{nodes: QueryOrder[]}>(GET_ORDERS_BY_ID_QUERY, {
    variables: { ids, maxProducts },
    fetchPolicy: "network-only",
  });

  const orders: Order[] = useMemo(() => {
    if (loading || !data) {
      return [];
    }

    return orders.map((order) => convertQueryOrderToOrder(order));
  }, [loading, data]);

  return useMemo(
    () => ({ orders, loading }),
    [orders, loading]
  );
};

export default useOrdersById;