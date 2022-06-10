import { useQuery } from "@apollo/react-hooks";
import { useMemo } from "react";
import { GET_ORDER_QUERY } from "@client/graphql";
import { getNodesFromConnections } from "@client/utilities/graphql";

export const useOrder = ({ id = null, maxProducts = 10 } = {}) => {
  const { data, loading } = useQuery(GET_ORDER_QUERY, {
    variables: { id, maxProducts },
    fetchPolicy: "network-only",
  });

  const order = useMemo(() => {
    if (!data) {
      return null;
    }

    return {
      ...data.order,
      products: getNodesFromConnections(data.order.lineItems).map(
        (product) => ({
          ...product,
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
