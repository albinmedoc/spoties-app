interface QueryProductVariant {
    displayName: string;
    id: string;
    image: {
        url: string;
        altText: string;
    };
    price: number;
    product: {
        id: string;
    };
    sku?: string;
    
}

export default QueryProductVariant;