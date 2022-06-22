import type OrderDisplayFulfillmentStatus from './OrderDisplayFulfillmentStatus';
import type QueryMinimalProduct from './QueryMinimalProduct';

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
    lineItems: { edges: { node: QueryMinimalProduct }[] };
    tags: string[];
    displayFulfillmentStatus: OrderDisplayFulfillmentStatus;
    fulfillments: {
        trackingInfo: {
            number: string
        }[]
    }[]
}