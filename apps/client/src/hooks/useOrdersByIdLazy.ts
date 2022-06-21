import { useLazyQuery } from "@apollo/client";
import { useMemo } from "react";
import { GET_ORDERS_BY_ID_QUERY } from "@client/graphql";
import { convertQueryOrderToOrder } from '@client/helpers';

import type { LazyQueryExecFunction } from "@apollo/client";
import type { QueryOrder, Order } from "@types";

interface Variables {
  ids?: string[];
  maxProducts?: number;
}

const useOrdersByIdLazy = (): [
  LazyQueryExecFunction<{ nodes: QueryOrder[] }, Variables>,
  {
    orders: Order[];
    loading: boolean;
  }
] => {
  const [trigger, { data, loading }] = useLazyQuery<{ nodes: QueryOrder[] }, Variables>(GET_ORDERS_BY_ID_QUERY, {
    fetchPolicy: "network-only",
  });

  const orders: Order[] = useMemo(() => {
    if (loading || !data) {
      return [];
    }

    return data.nodes.map((order) => convertQueryOrderToOrder(order));
  }, [loading, data]);

  return [trigger, { orders, loading }];
};

export default useOrdersByIdLazy;