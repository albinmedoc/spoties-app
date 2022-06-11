import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { GET_ORDER_QUERY } from "@client/graphql";
import { getNodesFromConnections } from "@client/utilities/graphql";
import type { QueryOrder, Order } from '@types';

const useOrder = ({ id = null, maxProducts = 10 } = {}) => {
  const { data, loading } = useQuery<{ order: QueryOrder }>(GET_ORDER_QUERY, {
    variables: { id, maxProducts },
    fetchPolicy: "network-only",
  });

  const order: Order = useMemo(() => {
    if (loading || !data) {
      return null;
    }

    return {
      ...data.order,
      totalPrice: data.order.currentSubtotalPriceSet.shopMoney.amount,
      products: getNodesFromConnections(data.order.lineItems).map(
        (product) => ({
          ...product,
          quantity: product.currentQuantity,
          variant: product.variant?.title,
        })
      ),
      trackingNumbers: data.order?.fulfillments
        ?.map((fulfillment) =>
          fulfillment?.trackingInfo?.map((trackingInfo) => trackingInfo?.number)
        )
        .flat(),
    };
  }, [data, loading]);

  return useMemo(() => ({ order, loading }), [order, loading]);
};

export default useOrder;