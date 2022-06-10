import { Page, Spinner } from "@shopify/polaris";
import { useParams } from "react-router-dom";
import { useOrder, useOrderUpdate } from "@client/hooks";
import { generateShopifyOrderGid } from "@client/helpers";
import { OrderStatusBadge, ProductCard, Tags } from "@client/components";

export function OrderDetails() {
  const { id } = useParams();
  const { order, loading: orderLoading } = useOrder({
    id: generateShopifyOrderGid(id),
  });

  const updateOrder = useOrderUpdate();

  if (orderLoading) {
    return <Spinner accessibilityLabel="Loading order" />;
  }

  const updateTags = (tags) => {
    updateOrder({ id: order.id, tags });
  };

  const productsMarkup = order.products.map((product) => (
    <ProductCard product={product} key={product.id} />
  ));

  return (
    <Page
      breadcrumbs={[{ content: "Orders", url: "/orders" }]}
      title={order.name}
      titleMetadata={<OrderStatusBadge order={order} />}
    >
      {productsMarkup}
      <Tags selectedTags={order.tags} updateTags={updateTags} />
    </Page>
  );
}
