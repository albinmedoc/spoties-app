import { QueryProduct } from "./QueryProduct";

interface Product extends QueryProduct{
    variant: string;
    quantity: number;
}