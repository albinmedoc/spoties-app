import { getNodesFromConnections } from "@client/utilities/graphql";
import { QueryOrder, Order, QueryProduct, Product } from '@types';
import getSpotifyUrlFromCustomAttributes from "./getSpotifyUrlFromCustomAttributes";

const convertQueryOrderToOrder = (queryOrder: QueryOrder): Order => ({
    ...queryOrder,
    totalPrice: queryOrder.currentSubtotalPriceSet.shopMoney.amount,
    lineItems: getNodesFromConnections(queryOrder.lineItems).map(
        (lineItem) => ({
            ...lineItem,
            quantity: lineItem.currentQuantity,
            customAttributes: [
                ...lineItem.customAttributes,
                {
                    key: 'Spotify URL',
                    value: getSpotifyUrlFromCustomAttributes(lineItem.customAttributes)
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