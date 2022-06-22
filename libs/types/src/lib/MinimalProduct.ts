import type QueryMinimalProduct from "./QueryMinimalProduct";

export default interface MinimalProduct extends QueryMinimalProduct {
    maxPrice: number;
    minPrice: number;
}