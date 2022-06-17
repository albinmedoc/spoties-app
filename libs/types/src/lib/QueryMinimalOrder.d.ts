import type OrderDisplayFulfillmentStatus from './OrderDisplayFulfillmentStatus';

export default interface QueryMinimalOrder {
    id: string;
    name: string;
    createdAt: string;
    customer: {
        firstName?: string;
        lastName?: string;
    };
    currentSubtotalPriceSet: {
        shopMoney: {
            amount: number;
        }
    };
    tags: string[];
    displayFulfillmentStatus: OrderDisplayFulfillmentStatus;
}