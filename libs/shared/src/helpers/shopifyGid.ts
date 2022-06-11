export function extractIdFromGid(gid: string) {
  return gid.split("/").pop();
}

function generateShopifyGid(entityType: string, value: string) {
  return `gid://shopify/${entityType}/${value}`;
}

export const generateShopifyProductGid = (value: string) => generateShopifyGid("Product", value);

export const generateShopifyOrderGid = (value: string) => generateShopifyGid("Order", value);
