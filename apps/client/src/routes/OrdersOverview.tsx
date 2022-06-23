import {
  Card,
  Stack,
  RadioButton,
} from "@shopify/polaris";
import { useState, useMemo } from "react";
import { OrdersTable } from "@client/components";

export default function OrdersOverview() {
  const queries = useMemo(() => [
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
  ], []);

  const [query, setQuery] = useState(queries[0]);

  const handleQueryChange = (_checked: boolean, id: string) => setQuery(queries.find((q) => q.id === id));

  const queryMarkup = queries.map(({ label, helpText, id }) => (
    <RadioButton
      label={label}
      helpText={helpText}
      checked={query.id === id}
      id={id}
      key={id}
      name="query"
      onChange={handleQueryChange}
    />
  ));

  return (
    <Card sectioned>
      <Stack>{queryMarkup}</Stack>
      <OrdersTable query={query.query} />
    </Card>
  );
}
