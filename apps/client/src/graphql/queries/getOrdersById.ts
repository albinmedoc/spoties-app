import { gql } from "@apollo/client";
import { OrderFields } from "../fragments";

const GET_ORDERS_BY_ID_QUERY = gql`
  ${OrderFields}
  query GetOrdersById($ids: [ID]!, $maxProducts: Int) {
    nodes(ids: $ids) {
        ...on Order {
            ...OrderFields
        }
    }
  }
`;

export default GET_ORDERS_BY_ID_QUERY;
