import type QueryOrder  from "./QueryOrder";
import type MinimalProduct from "./MinimalProduct";

export default interface Order extends QueryOrder {
    totalPrice: number;
    products: MinimalProduct[];
    trackingNumbers: string[];
}