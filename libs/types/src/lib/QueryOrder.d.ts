import type OrderDisplayFulfillmentStatus from './OrderDisplayFulfillmentStatus';
import type QueryLineItem from './QueryLineItem';

export default interface QueryOrder {
    id: string;
    name: string;
    createdAt: string;
    displayAddress: {
        formatted: string[];
    };
    customer: {
        firstName?: string;
        lastName?: string;
    };
    currentSubtotalPriceSet: {
        shopMoney: {
            amount: number;
        }
    };
    lineItems: { edges: { node: QueryLineItem }[] };
    tags: string[];
    displayFulfillmentStatus: OrderDisplayFulfillmentStatus;
    fulfillments: {
        trackingInfo: {
            number: string
        }[]
    }[]
}