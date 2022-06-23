import type QueryOrder  from "./QueryOrder";
import type LineItem from "./LineItem";

export default interface Order extends QueryOrder {
    totalPrice: number;
    lineItems: LineItem[];
    trackingNumbers: string[];
}