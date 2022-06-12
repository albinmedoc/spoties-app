import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { GET_ORDERS_QUERY } from "@client/graphql";
import { getNodesFromConnections } from "@client/utilities/graphql";
import { getSpotifyUrlFromCustomAttributes } from '@client/helpers';
import type { QueryOrders, QueryOrder, Order } from "@types";

const useOrders = (
  { query = "", maxOrders = 20, maxProducts = 10 } = {},
  deps = []
) => {
  const { data, loading } = useQuery<{ orders: QueryOrders }>(GET_ORDERS_QUERY, {
    variables: { query, maxOrders, maxProducts },
    fetchPolicy: "network-only",
  });

  const orders: Order[] = useMemo(() => {
    if (loading || !data) {
      return [];
    }

    const nodes = getNodesFromConnections<QueryOrder>(data.orders);

    return nodes.map((node) => ({
      ...node,
      totalPrice: node.currentSubtotalPriceSet.shopMoney.amount,
      products: getNodesFromConnections(node.lineItems).map((product) => ({
        ...product,
        quantity: product.currentQuantity,
        customAttributes: [
          ...product.customAttributes,
          {
            key: 'Spotify URL',
            value: getSpotifyUrlFromCustomAttributes(product.customAttributes)
          }
        ],
        variant: product.variant?.title,
      })),
      trackingNumbers: node?.fulfillments
        ?.map((fulfillment) =>
          fulfillment?.trackingInfo?.map((trackingInfo) => trackingInfo?.number)
        )
        .flat(),
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

export default useOrders;