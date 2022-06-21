import {
    IndexTable,
    TextStyle,
    useIndexResourceState,
    Pagination,
} from "@shopify/polaris";
import dayjs from 'dayjs'
import { Link } from "react-router-dom";
import { useMinimalOrders, useOrdersByIdLazy } from "@client/hooks";
import { extractIdFromGid } from "@shared/helpers";
import { generateWorkbookFromOrders } from "@client/helpers";
import { OrderStatusBadge } from "@client/components";
import { saveAs } from "file-saver";
import type { NonEmptyArray } from "@shopify/polaris/build/ts/latest/src/types";
import type { IndexTableHeading } from "@shopify/polaris/build/ts/latest/src/components/IndexTable";

interface OrderTableProps {
    query: string;
}

export default function OrdersTable(props: OrderTableProps) {
    const {
        orders,
        loading: tableLoading,
        previousCursor,
        nextCursor,
    } = useMinimalOrders(
        {
            query: props.query,
        },
        [props.query]
    );

    const [loadSelectedOrders, { orders: selectedOrders }] = useOrdersByIdLazy();

    const { selectedResources: selectedOrderIds, allResourcesSelected: allOrdersSelected, handleSelectionChange } =
        useIndexResourceState(orders);

    const exportOrders = (exportFormat: 'CSV' | 'EXCEL') => loadSelectedOrders({variables: { ids: selectedOrderIds }})
        .then(() => generateWorkbookFromOrders(selectedOrders))
        .then((workbook) => exportFormat === 'EXCEL' ? workbook.xlsx.writeBuffer() : workbook.csv.writeBuffer())
        .then((buffer) => {
            const exportDate = dayjs().format('YYYY-MM-DD');
            const extension = exportFormat === 'EXCEL' ? 'xlsx' : 'csv';
            const filename = `Order_Export_${exportDate}.${extension}`;
            saveAs(new Blob([buffer]), filename);
        });

    const promotedBulkActions = [
        {
            title: "Export",
            actions: [
                {
                    content: "Export as CSV",
                    onAction: () => {
                        exportOrders('CSV')
                    },
                },
                {
                    content: "Export as Excel",
                    onAction: () => {
                        exportOrders('EXCEL')
                    },
                },
            ],
        },
    ];

    const headings: NonEmptyArray<IndexTableHeading> = [
        { title: "Name" },
        { title: "Created At" },
        { title: "Price" },
        { title: "Customer" },
        { title: "Status" },
    ];

    const resourceName = {
        singular: "order",
        plural: "orders",
    };

    const rowMarkup = orders.map((order, index) => (
        <IndexTable.Row
            id={order.id}
            key={order.id}
            selected={selectedOrderIds.includes(order.id)}
            position={index}
        >
            <IndexTable.Cell>
                <TextStyle variation="strong">
                    <Link to={`/orders/${extractIdFromGid(order.id)}`} data-primary-link>
                        {order.name}
                    </Link>
                </TextStyle>
            </IndexTable.Cell>
            <IndexTable.Cell>{dayjs(order.createdAt).format('YYYY-MM-DD HH:mm')}</IndexTable.Cell>
            <IndexTable.Cell>{order.totalPrice}</IndexTable.Cell>
            <IndexTable.Cell>
                {order.customer?.firstName} {order.customer?.lastName}
            </IndexTable.Cell>
            <IndexTable.Cell>
                <OrderStatusBadge status={order.displayFulfillmentStatus} tags={order.tags} />
            </IndexTable.Cell>
        </IndexTable.Row>
    ));

    return (
        <>
            <IndexTable
                loading={tableLoading}
                resourceName={resourceName}
                itemCount={orders.length}
                selectedItemsCount={
                    allOrdersSelected ? "All" : selectedOrderIds.length
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
