import type OrderDisplayFulfillmentStatus from './OrderDisplayFulfillmentStatus';

export default interface MinimalOrder {
    id: string;
    name: string;
    createdAt: string;
    totalPrice: number;
    customer: {
        firstName?: string;
        lastName?: string;
    };
    tags: string[];
    displayFulfillmentStatus: OrderDisplayFulfillmentStatus;
}