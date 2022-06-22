import type QueryMinimalProduct from "./QueryMinimalProduct";

export default interface QueryProduct extends QueryMinimalProduct {
    descriptionHtml: string;
    handle: string;
    tags: string[];
}