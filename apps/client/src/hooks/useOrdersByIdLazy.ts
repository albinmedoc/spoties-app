import { useLazyQuery } from "@apollo/client";
import { useMemo } from "react";
import { GET_ORDERS_BY_ID_QUERY } from "@client/graphql";
import { convertQueryOrderToOrder } from '@client/helpers';
import type { QueryOrder, Order } from "@types";

interface Variables {
  ids?: string[];
  maxProducts?: number;
}

const useOrdersByIdLazy = (): [
  (variables: Variables) => Promise<Order[]>,
  {
    orders: Order[];
    loading: boolean;
  }
] => {
  const [trigger, { data, loading }] = useLazyQuery<{ nodes: QueryOrder[] }, Variables>(GET_ORDERS_BY_ID_QUERY, {
    fetchPolicy: "network-only",
  });

  const convertQueryDataToOrders = (queryData: { nodes: QueryOrder[] }) => queryData.nodes.map((order) => convertQueryOrderToOrder(order))

  const orders: Order[] = useMemo(() => {
    if (loading || !data) {
      return [];
    }

    return convertQueryDataToOrders(data);
  }, [loading, data]);

  const loadOrders = useMemo(() => (variables: Variables) => trigger({variables}).then((queryResult) => convertQueryDataToOrders(queryResult.data)), [trigger]);

  return [loadOrders, { orders, loading }];
};

export default useOrdersByIdLazy;