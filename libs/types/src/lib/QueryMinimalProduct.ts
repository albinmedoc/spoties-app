import ProductStatus from "./ProductStatus";

export default interface QueryMinimalProduct {
    id: string;
    featuredImage: {
        altText?: string;
        url: string;
    }
    priceRangeV2: {
        maxVariantPrice: {
            amount: number;
        }
        minVariantPrice: {
            amount: number;
        }
    }
    status: ProductStatus;
    title: string;
    totalVariants: number;
}