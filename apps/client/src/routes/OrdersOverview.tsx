import {
  Card,
  IndexTable,
  TextStyle,
  useIndexResourceState,
  Pagination,
  Stack,
  RadioButton,
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Link } from "react-router-dom";
import { useMemo, useState, useCallback } from "react";
import { saveAs } from "file-saver";
import { useOrders } from "@client/hooks";
import { fetchOrdersCSV, fetchOrdersExcel } from "@client/services/sheet";
import { extractIdFromGid } from "@shared/helpers";
import { OrderStatusBadge } from "@client/components";
import type { NonEmptyArray } from "@shopify/polaris/build/ts/latest/src/types";
import type { IndexTableHeading } from "@shopify/polaris/build/ts/latest/src/components/IndexTable";

export default function OrdersOverview() {
  const queries = [
    {
      id: "unhandled",
      label: "Unhandled orders",
      helpText: "Get unhandled orders",
      query:
        "tag_not:AliExpress AND tag_not:Dsers AND -fulfillment_status:shipped",
    },
    {
      id: "all",
      label: "All orders",
      helpText: "Get all orders",
      query: "",
    },
  ];

  const [queryId, setQueryId] = useState(queries[0].id);

  const handleQueryChange = useCallback(
    (_checked: boolean, id: string) => setQueryId(id),
    []
  );

  const {
    orders,
    loading: ordersLoading,
    previousCursor,
    nextCursor,
  } = useOrders(
    {
      query: queries.find((query) => query.id === queryId).query,
    },
    [queryId]
  );

  // For debbuging
  // eslint-disable-next-line no-console
  console.log(orders);

  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const selectedOrders = useMemo(() => {
    if (!selectedResources) {
      return [];
    }

    return selectedResources.map((orderId) =>
      orders.find((order) => order.id === orderId)
    );
  }, [selectedResources, orders]);

  const app = useAppBridge();

  const promotedBulkActions = [
    {
      title: "Export",
      actions: [
        {
          content: "Export as CSV",
          onAction: () => {
            fetchOrdersCSV(app, selectedOrders)
              .then((res) => res.blob())
              .then((blob) => saveAs(blob, "Test.csv"))
              .catch((err) => console.error(err));
          },
        },
        {
          content: "Export as Excel",
          onAction: () => {
            fetchOrdersExcel(app, selectedOrders)
              .then((res) => res.blob())
              .then((blob) => saveAs(blob, "Test.xlsx"))
              .catch((err) => console.error(err));
          },
        },
      ],
    },
  ];

  const queryMarkup = queries.map(({ label, helpText, id }) => (
    <RadioButton
      label={label}
      helpText={helpText}
      checked={queryId === id}
      id={id}
      key={id}
      name="query"
      onChange={handleQueryChange}
    />
  ));

  const rowMarkup = orders.map((order, index) => (
    <IndexTable.Row
      id={order.id}
      key={order.id}
      selected={selectedResources.includes(order.id)}
      position={index}
    >
      <IndexTable.Cell>
        <TextStyle variation="strong">
          <Link to={`/orders/${extractIdFromGid(order.id)}`} data-primary-link>
            {order.name}
          </Link>
        </TextStyle>
      </IndexTable.Cell>
      <IndexTable.Cell>{order.createdAt}</IndexTable.Cell>
      <IndexTable.Cell>{order.totalPrice}</IndexTable.Cell>
      <IndexTable.Cell>{order.products.length}</IndexTable.Cell>
      <IndexTable.Cell>
        {order.customer?.firstName} {order.customer?.lastName}
      </IndexTable.Cell>
      <IndexTable.Cell>
        <OrderStatusBadge order={order} />
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  const headings: NonEmptyArray<IndexTableHeading> = [
    { title: "Name" },
    { title: "Created At" },
    { title: "Price" },
    { title: "Quantity" },
    { title: "Customer" },
    { title: "Status" },
  ];

  return (
    <Card sectioned>
      <Stack>{queryMarkup}</Stack>
      <IndexTable
        loading={ordersLoading}
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        promotedBulkActions={promotedBulkActions}
        headings={headings}
      >
        {rowMarkup}
      </IndexTable>
      <Pagination hasPrevious={!!previousCursor} hasNext={!!nextCursor} />
    </Card>
  );
}
