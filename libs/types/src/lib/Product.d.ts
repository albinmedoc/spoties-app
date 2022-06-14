import type QueryProduct from "./QueryProduct";

export default interface Product extends QueryProduct {
    quantity: number;
}