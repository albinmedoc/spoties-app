import { Page, Spinner } from "@shopify/polaris";
import { useParams } from "react-router-dom";
import { useOrder, useOrderUpdate } from "@client/hooks";
import { generateShopifyOrderGid } from "@shared/helpers";
import { OrderStatusBadge, LineItemCard, Tags } from "@client/components";

export default function OrderDetails() {
  const { id } = useParams();
  const { order, loading: orderLoading } = useOrder({
    id: generateShopifyOrderGid(id),
  });

  const updateOrder = useOrderUpdate();

  if (orderLoading) {
    return <Spinner accessibilityLabel="Loading order" />;
  }

  const updateTags = (tags: string[]) => {
    updateOrder({ id: order.id, tags });
  };

  const productsMarkup = order.lineItems.map((product) => (
    <LineItemCard lineItem={product} key={product.id} />
  ));

  return (
    <Page
      breadcrumbs={[{ content: "Orders", url: "/orders" }]}
      title={order.name}
      titleMetadata={<OrderStatusBadge status={order.displayFulfillmentStatus} tags={order.tags} />}
    >
      {productsMarkup}
      <Tags selectedTags={order.tags} updateTags={updateTags} />
    </Page>
  );
}
