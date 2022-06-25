import { Card, Page, Spinner } from "@shopify/polaris";
import { useParams } from "react-router-dom";
import { useProduct } from "@client/hooks";
import { generateShopifyProductGid } from "@shared/helpers";

export default function ProductDetails() {
  const { id } = useParams();
  const { product, loading: productLoading } = useProduct({
    id: generateShopifyProductGid(id),
  });

  // eslint-disable-next-line no-console
  console.log(product);

  if (productLoading) {
    return <Spinner accessibilityLabel="Loading order" />;
  }

  return (
    <Page
      breadcrumbs={[{ content: "Products", url: "/products" }]}
      title={product.title}
    >
      <Card>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
      </Card>
    </Page>
  );
}
