export interface PagedResult<T> {
    edges: {node: T}[];
    pageInfo: {
        endCursor?: string;
        hasNextPage?: boolean;
        startCursor?: string;
        hasPreviousPage?: boolean;
    }
}