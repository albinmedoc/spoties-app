import type QueryLineItem from "./QueryLineItem";

export default interface LineItem extends QueryLineItem {
    quantity: number;
}