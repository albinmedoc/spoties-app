import type { OrderDisplayFulfillmentStatus } from './OrderDisplayFulfillmentStatus';
import type { QueryProduct } from './QueryProduct';

export interface QueryOrder {
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
    lineItems: { edges: { node: QueryProduct }[] };
    tags: string[];
    displayFulfillmentStatus: OrderDisplayFulfillmentStatus;
    fulfillments: {
        trackingInfo: {
            number: string
        }[]
    }[]
}