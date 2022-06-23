import ProductStatus from "./ProductStatus";
import PriceRangeV2 from "./PriceRangeV2";

export default interface QueryMinimalProduct {
    id: string;
    featuredImage: {
        altText?: string;
        url: string;
    }
    priceRangeV2: PriceRangeV2;
    status: ProductStatus;
    title: string;
    totalVariants: number;
}