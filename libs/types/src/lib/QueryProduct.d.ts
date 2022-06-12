export interface QueryProduct {
    id: string;
    title: string;
    variant: {
        title: string;
    }
    currentQuantity: number;
    image: {
        altText?: string;
        url: string;
    }
    customAttributes: {
        key: string;
        value?: string;
    }[]
}