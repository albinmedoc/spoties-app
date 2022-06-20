import { gql } from "@apollo/client";

export default gql`
    fragment PageInfoFields on PageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
        startCursor
    }
`;