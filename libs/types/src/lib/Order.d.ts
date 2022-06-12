import type QueryOrder  from "./QueryOrder";
import type Product from "./Product";

export default interface Order extends QueryOrder {
    totalPrice: number;
    products: Product[];
    trackingNumbers: string[];
}