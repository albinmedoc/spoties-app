import { Card, Thumbnail, Badge, TextStyle } from "@shopify/polaris";
import { isValidUrl } from "@client/helpers";
import type { Product } from '@types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard(props: ProductCardProps) {
  const { product } = props;

  const variantMarkup = product.variant ? (
    <p>
      <TextStyle variation="subdued">Variant: </TextStyle>
      {product.variant}
    </p>
  ) : null;

  const customAttributesMarkup = product.customAttributes.map(
    (customAttribute) => {
      const value = customAttribute.value;

      return (
        <p key={customAttribute.key}>
          <TextStyle variation="subdued">{customAttribute.key}: </TextStyle>
          {!isValidUrl(value) ? value: <Thumbnail
            source={value}
            alt={customAttribute.key}
            size="medium"
          />}
        </p>
      );
    }
  );

  return (
    <Card>
      <div>
        <Badge>{product.quantity.toString()}</Badge>
        <Thumbnail
          source={product.image?.url}
          alt={product.image?.altText}
          size="small"
        />
      </div>
      <div>
        <h2>{product.title}</h2>
        {variantMarkup}
        {customAttributesMarkup}
      </div>
    </Card>
  );
}
