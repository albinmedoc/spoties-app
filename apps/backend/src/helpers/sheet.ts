import ExcelJS from "exceljs";
import type { Order , Product} from '@types';
import isUrl from "./is-url";

const generateWorkbookFromOrders = (orders: Order[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  worksheet.columns = [
    { header: "Order Id", key: "id" },
    { header: "Created at", key: "createdAt" },
    { header: "Address", key: "address" },
    { header: "Customer", key: "customer" },
    { header: "Product", key: "product" },
    { header: "Quantity", key: "quantity" },
    { header: "Properties", key: "properties" },
  ];

  const getCustomAttributes = (product: Product) => {
    if (product && product.customAttributes) {
      const attributes = product.customAttributes.reduce((result, attr) => {
        if (!isUrl(attr.value)) result.push(`${attr.key}: ${attr.value}`);
        return result;
      }, []);
      return attributes.join(";");
    }
    return "";
  };

  const products: Record<string, string>[] = [];

  orders.forEach((order) => {
    order.products.forEach((product) => {
      products.push({
        id: order.name,
        createdAt: order.createdAt,
        address: order.displayAddress?.formatted.toString(),
        customer: `${order.customer?.firstName} ${order.customer?.lastName}`,
        product: product.title,
        quantity: product.quantity.toString(),
        properties: getCustomAttributes(product),
      });
    });
  });

  worksheet.addRows(products);

  return workbook;
};

export { generateWorkbookFromOrders };
