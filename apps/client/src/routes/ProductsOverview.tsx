import {
    Card
} from "@shopify/polaris";
import { ProductsTable } from "@client/components";

export default function ProductsOverview() {

    return (
        <Card sectioned>
            <ProductsTable query="" />
        </Card>
    );
}
