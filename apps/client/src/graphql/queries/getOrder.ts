import { gql } from "@apollo/client";
import { OrderFields } from "../fragments";

const GET_ORDER_QUERY = gql`
  ${OrderFields}
  query GetOrder($id: ID!, $maxProducts: Int) {
    order(id: $id) {
      ...OrderFields
    }
  }
`;

export default GET_ORDER_QUERY;
