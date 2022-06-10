export function extractIdFromGid(gid) {
  return gid.split("/").pop();
}

function generateShopifyGid(entityType, value) {
  return `gid://shopify/${entityType}/${value}`;
}

export const generateShopifyProductGid = (value) => {
  return generateShopifyGid("Product", value);
};

export const generateShopifyOrderGid = (value) => {
  return generateShopifyGid("Order", value);
};
