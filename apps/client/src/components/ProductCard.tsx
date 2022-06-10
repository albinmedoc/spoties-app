import { Card, Thumbnail, Badge, TextStyle } from "@shopify/polaris";
import { isValidUrl } from "@client/helpers";
import type { Product } from '@types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard(props: ProductCardProps) {
  const variantMarkup = props.product.variant ? (
    <p>
      <TextStyle variation="subdued">Variant: </TextStyle>
      {props.product.variant}
    </p>
  ) : null;

  const customAttributesMarkup = props.product.customAttributes.map(
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
        <Badge>{props.product.quantity.toString()}</Badge>
        <Thumbnail
          source={props.product.image?.url}
          alt={props.product.image?.altText}
          size="small"
        />
      </div>
      <div>
        <h2>{props.product.title}</h2>
        {variantMarkup}
        {customAttributesMarkup}
      </div>
    </Card>
  );
}
