import { Card, Thumbnail, Badge, TextStyle } from "@shopify/polaris";
import { isValidUrl } from "@client/helpers";

export function ProductCard(props) {
  const variantMarkup = props.product.variant ? (
    <p>
      <TextStyle variation="subdued">Variant: </TextStyle>
      {props.product.variant}
    </p>
  ) : null;

  const customAttributesMarkup = props.product.customAttributes.map(
    (customAttribute) => {
      let value = customAttribute.value;

      if (isValidUrl(value)) {
        value = (
          <Thumbnail
            source={value}
            alt={customAttribute.key}
            size="medium"
          />
        );
      }

      return (
        <p key={customAttribute.key}>
          <TextStyle variation="subdued">{customAttribute.key}: </TextStyle>
          {value}
        </p>
      );
    }
  );

  return (
    <Card>
      <div>
        <Badge>{props.product.quantity}</Badge>
        <Thumbnail
          source={props.product.image?.url}
          alt={props.product.image?.altText}
          size="small"
        />
      </div>
      <div>
        <h2>{props.product.name}</h2>
        {variantMarkup}
        {customAttributesMarkup}
      </div>
    </Card>
  );
}
