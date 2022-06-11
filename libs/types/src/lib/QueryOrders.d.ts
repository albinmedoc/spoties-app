import { QueryOrder } from './QueryOrder';

export default interface QueryOrders extends QueryOrder {
    edges: {
        node: QueryOrder
    }[]
}
