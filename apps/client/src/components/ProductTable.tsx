import {
    IndexTable,
    TextStyle,
    useIndexResourceState,
    Pagination,
    Badge,
    Thumbnail,
} from "@shopify/polaris";
import { Link } from "react-router-dom";
import { useMinimalProducts, useProductsByIdLazy } from "@client/hooks";
import { extractIdFromGid } from "@shared/helpers";
import type { NonEmptyArray } from "@shopify/polaris/build/ts/latest/src/types";
import type { IndexTableHeading } from "@shopify/polaris/build/ts/latest/src/components/IndexTable";
import type { MinimalProduct, PriceRangeV2 } from "@types";
import { generateWorkbookFromProducts } from "@client/helpers";
import dayjs from "dayjs";
import saveAs from "file-saver";

interface ProductsTableProps {
    query: string;
}

export default function ProductsTable(props: ProductsTableProps) {
    const {
        products: minimalProducts,
        loading: tableLoading,
        previousCursor,
        nextCursor,
    } = useMinimalProducts(
        {
            query: props.query,
        },
        [props.query]
    );

    const [loadSelectedProducts] = useProductsByIdLazy();

    const { selectedResources: selectedProductIds, allResourcesSelected: allOrdersSelected, handleSelectionChange } =
        useIndexResourceState(minimalProducts as Array<MinimalProduct & { [key: string]: unknown }>);

    const exportProducts = (exportFormat: 'CSV' | 'EXCEL') =>
        loadSelectedProducts({
            ids: selectedProductIds,
            maxProductVariants: minimalProducts.filter((p) => selectedProductIds.includes(p.id)).map((p) => p.totalVariants).reduce((a, b) => a + b, 0)
        })
            .then((products) => generateWorkbookFromProducts(products))
            .then((workbook) => exportFormat === 'EXCEL' ? workbook.xlsx.writeBuffer() : workbook.csv.writeBuffer())
            .then((buffer) => {
                const exportDate = dayjs().format('YYYY-MM-DD');
                const extension = exportFormat === 'EXCEL' ? 'xlsx' : 'csv';
                const filename = `Product_Export_${exportDate}.${extension}`;
                saveAs(new Blob([buffer]), filename);
            });

    const promotedBulkActions = [
        {
            title: "Export",
            actions: [
                {
                    content: "Export as CSV",
                    onAction: () => {
                        exportProducts('CSV')
                    },
                },
                {
                    content: "Export as Excel",
                    onAction: () => {
                        exportProducts('EXCEL')
                    },
                },
            ],
        },
    ];

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

    const rowMarkup = minimalProducts.map((product, index) => (
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
                itemCount={minimalProducts.length}
                selectedItemsCount={
                    allOrdersSelected ? "All" : selectedProductIds.length
                }
                onSelectionChange={handleSelectionChange}
                promotedBulkActions={promotedBulkActions}
                headings={headings}
            >
                {rowMarkup}
            </IndexTable>
            <Pagination hasPrevious={!!previousCursor} hasNext={!!nextCursor} />
        </>
    );
}
