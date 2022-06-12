import { Card, Thumbnail, Badge, TextStyle } from "@shopify/polaris";
import { isUrl, isImageUrl } from "@shared/helpers";
import type { Product, CustomAttribute } from '@types';

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

  const customAttributeValueMarkup = (attribute: CustomAttribute) => {
    if(isUrl(attribute.value)) {
      if(isImageUrl(attribute.value)){
        return <Thumbnail
        source={attribute.value}
        alt={attribute.key}
        size="medium"
      />
      }
      return <a href={attribute.value}>{attribute.value}</a>
    }
    return <span>{attribute.value}</span>
  }

  const customAttributesMarkup = product.customAttributes.map(
    (customAttribute) => <p key={customAttribute.key}>
          <TextStyle variation="subdued">{customAttribute.key}: </TextStyle>
          {customAttributeValueMarkup(customAttribute)}
        </p>
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
