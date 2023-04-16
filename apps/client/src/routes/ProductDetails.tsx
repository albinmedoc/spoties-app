import { Card, Page, Spinner } from "@shopify/polaris";
import { useParams } from "react-router-dom";
import { useProduct } from "@client/hooks";
import { generateShopifyProductGid } from "@shared/helpers";
import SpotiesFields from "@client/components/SpotiesFields";

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
        <Card.Section>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        </Card.Section>
        <Card.Section>
          <SpotiesFields settings={[]}/>
        </Card.Section>
      </Card>
    </Page>
  );
}
