import { Card, Thumbnail, Badge, TextStyle } from "@shopify/polaris";
import { isUrl, isImageUrl } from "@shared/helpers";
import type { LineItem, CustomAttribute } from '@types';

interface LineItemCardProps {
  lineItem: LineItem;
}

export default function LineItemCard(props: LineItemCardProps) {
  const { lineItem } = props;

  const variantMarkup = lineItem.variantTitle ? (
    <p>
      <TextStyle variation="subdued">Variant: </TextStyle>
      {lineItem.variantTitle}
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

  const customAttributesMarkup = lineItem.customAttributes.map(
    (customAttribute) => <p key={customAttribute.key}>
          <TextStyle variation="subdued">{customAttribute.key}: </TextStyle>
          {customAttributeValueMarkup(customAttribute)}
        </p>
  );

  return (
    <Card>
      <div>
        <Badge>{lineItem.quantity.toString()}</Badge>
        <Thumbnail
          source={lineItem.image?.url}
          alt={lineItem.image?.altText}
          size="small"
        />
      </div>
      <div>
        <h2>{lineItem.title}</h2>
        {variantMarkup}
        {customAttributesMarkup}
      </div>
    </Card>
  );
}
