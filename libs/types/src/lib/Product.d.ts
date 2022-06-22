import type QueryProduct from "./QueryProduct";

export default interface Product extends QueryProduct {
    maxPrice: number;
    minPrice: number;
}