export function extractIdFromGid(gid) {
  return gid.split("/").pop();
}

function generateShopifyGid(entityType, value) {
  return `gid://shopify/${entityType}/${value}`;
}

export const generateShopifyProductGid = (value) => generateShopifyGid("Product", value);

export const generateShopifyOrderGid = (value) => generateShopifyGid("Order", value);
