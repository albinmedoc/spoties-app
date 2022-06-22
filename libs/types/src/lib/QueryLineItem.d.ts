import type CustomAttribute from "./CustomAttribute";

export default interface QueryLineItem {
    id: string;
    title: string;
    variantTitle?: string;
    currentQuantity: number;
    image: {
        altText?: string;
        url: string;
    }
    customAttributes: CustomAttribute[]
}