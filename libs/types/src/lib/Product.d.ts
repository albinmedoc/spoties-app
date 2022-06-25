import type QueryProduct from "./QueryProduct";
import type ProductVariant from "./ProductVariant";

export default interface Product extends QueryProduct {
    variants: ProductVariant[];
}