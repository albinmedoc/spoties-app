import {
    IndexTable,
    TextStyle,
    useIndexResourceState,
    Pagination,
    Badge,
    Thumbnail,
} from "@shopify/polaris";
import { Link } from "react-router-dom";
import { useMinimalProducts } from "@client/hooks";
import { extractIdFromGid } from "@shared/helpers";
import type { NonEmptyArray } from "@shopify/polaris/build/ts/latest/src/types";
import type { IndexTableHeading } from "@shopify/polaris/build/ts/latest/src/components/IndexTable";
import type { MinimalProduct, PriceRangeV2 } from "@types";

interface ProductsTableProps {
    query: string;
}

export default function ProductsTable(props: ProductsTableProps) {
    const {
        products,
        loading: tableLoading,
        previousCursor,
        nextCursor,
    } = useMinimalProducts(
        {
            query: props.query,
        },
        [props.query]
    );

    const { selectedResources: selectedProductIds, allResourcesSelected: allOrdersSelected, handleSelectionChange } =
        useIndexResourceState(products as Array<MinimalProduct & { [key: string]: unknown }>);

    const headings: NonEmptyArray<IndexTableHeading> = [
        { title: "" },
        { title: "Product" },
        { title: "Price" },
        { title: "Variants" },
        { title: "Status" },
    ];

    const resourceName = {
        singular: "product",
        plural: "products",
    };

    const priceMarkup = (priceRange: PriceRangeV2) => {
        if (priceRange.minVariantPrice.amount === priceRange.maxVariantPrice.amount) {
            return priceRange.maxVariantPrice.amount.toString();
        }
        return `${priceRange.minVariantPrice.amount} - ${priceRange.maxVariantPrice.amount}`
    }

    const rowMarkup = products.map((product, index) => (
        <IndexTable.Row
            id={product.id}
            key={product.id}
            selected={selectedProductIds.includes(product.id)}
            position={index}
        >
            <IndexTable.Cell>
                <Thumbnail
                    source={product.featuredImage.url}
                    alt={product.featuredImage.altText}
                    size="small"
                />
            </IndexTable.Cell>
            <IndexTable.Cell>
                <TextStyle variation="strong">
                    <Link to={`/products/${extractIdFromGid(product.id)}`} data-primary-link>
                        {product.title}
                    </Link>
                </TextStyle>
            </IndexTable.Cell>
            <IndexTable.Cell>
                {priceMarkup(product.priceRangeV2)}
            </IndexTable.Cell>
            <IndexTable.Cell>
                {product.totalVariants}
            </IndexTable.Cell>
            <IndexTable.Cell>
                <Badge>{product.status}</Badge>
            </IndexTable.Cell>
        </IndexTable.Row>
    ));

    return (
        <>
            <IndexTable
                loading={tableLoading}
                resourceName={resourceName}
                itemCount={products.length}
                selectedItemsCount={
                    allOrdersSelected ? "All" : selectedProductIds.length
                }
                onSelectionChange={handleSelectionChange}
                headings={headings}
            >
                {rowMarkup}
            </IndexTable>
            <Pagination hasPrevious={!!previousCursor} hasNext={!!nextCursor} />
        </>
    );
}
