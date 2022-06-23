import { Page, Spinner } from "@shopify/polaris";
import { useParams } from "react-router-dom";
import { useProduct } from "@client/hooks";
import { generateShopifyOrderGid } from "@shared/helpers";
import { OrderStatusBadge, LineItemCard, Tags } from "@client/components";

export default function ProductDetails() {
  const { id } = useParams();
  const { product, loading: productLoading } = useProduct({
    id: generateShopifyOrderGid(id),
  });

  if (productLoading) {
    return <Spinner accessibilityLabel="Loading order" />;
  }

  return (
    <Page
      breadcrumbs={[{ content: "Products", url: "/products" }]}
      title={product.title}
    >
      {product}
    </Page>
  );
}
