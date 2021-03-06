import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { GET_ORDER_QUERY } from "@client/graphql";
import { convertQueryOrderToOrder } from '@client/helpers';
import type { QueryOrder, Order } from '@types';

interface Parameters {
  id: string;
  maxProducts?: number;
}

const useOrder = ({ id, maxProducts = 10 }: Parameters) => {
  const { data, loading } = useQuery<{ order: QueryOrder }>(GET_ORDER_QUERY, {
    variables: { id, maxProducts },
    fetchPolicy: "network-only",
  });

  const order: Order = useMemo(() => {
    if (loading || !data) {
      return null;
    }

    return convertQueryOrderToOrder(data.order);
  }, [data, loading]);

  return useMemo(() => ({ order, loading }), [order, loading]);
};

export default useOrder;