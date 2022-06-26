import ExcelJS from "exceljs";
import type { Order , LineItem, Product} from '@types';
import { isUrl } from "@shared/helpers";

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

  const getCustomAttributes = (lineItem: LineItem) => {
    if (lineItem && lineItem.customAttributes) {
      const attributes = lineItem.customAttributes.reduce((result, attr) => {
        if (!isUrl(attr.value)) result.push(`${attr.key}: ${attr.value}`);
        return result;
      }, []);
      return attributes.join(";");
    }
    return "";
  };

  const products: Record<string, string>[] = [];

  orders.forEach((order) => {
    order.lineItems.forEach((product) => {
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

const generateWorkbookFromProducts = (products: Product[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  worksheet.columns = [
    { header: "Product", key: "title" },
    { header: "Variant", key: "variantName" },
    { header: "Price", key: "price" },
    { header: "Sku", key: "sku" },
  ];

  const variants: Record<string, string>[] = [];

  products.forEach((product) => {
    product.variants.forEach((variant) => {
      variants.push({
        title: product.title,
        variantName: variant.displayName,
        price: variant.price.toString(),
        sku: variant.sku,
      });
    });
  });

  worksheet.addRows(variants);

  return workbook;
};

export { generateWorkbookFromOrders, generateWorkbookFromProducts };
