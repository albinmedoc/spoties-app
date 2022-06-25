import type NodeConnection from './NodeConnection';

interface PagedResult<T> extends NodeConnection<T> {
    pageInfo: {
        endCursor?: string;
        hasNextPage?: boolean;
        startCursor?: string;
        hasPreviousPage?: boolean;
    }
}

export default PagedResult;