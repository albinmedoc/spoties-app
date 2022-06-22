import { getNodesFromConnections } from "@client/utilities/graphql";
import { QueryOrder, Order, QueryProduct, Product } from '@types';
import getSpotifyUrlFromCustomAttributes from "./getSpotifyUrlFromCustomAttributes";

const convertQueryOrderToOrder = (queryOrder: QueryOrder): Order => ({
    ...queryOrder,
    totalPrice: queryOrder.currentSubtotalPriceSet.shopMoney.amount,
    products: getNodesFromConnections(queryOrder.lineItems).map(
        (product) => ({
            ...product,
            quantity: product.currentQuantity,
            customAttributes: [
                ...product.customAttributes,
                {
                    key: 'Spotify URL',
                    value: getSpotifyUrlFromCustomAttributes(product.customAttributes)
                }
            ],
        })
    ),
    trackingNumbers: queryOrder?.fulfillments
        ?.map((fulfillment) =>
            fulfillment?.trackingInfo?.map((trackingInfo) => trackingInfo?.number)
        )
        .flat(),
});

const convertQueryProductToProduct = (queryProduct: QueryProduct): Product => ({
    ...queryProduct,
    maxPrice: queryProduct.priceRangeV2.maxVariantPrice.amount,
    minPrice: queryProduct.priceRangeV2.minVariantPrice.amount,
});

export { convertQueryOrderToOrder, convertQueryProductToProduct }