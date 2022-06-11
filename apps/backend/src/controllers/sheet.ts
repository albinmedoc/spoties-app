import type { Request, Response, Application } from "express";
import { generateWorkbookFromOrders } from "@backend/helpers";

export default function registerController(app: Application) {
  app.post("/sheet/orders", (req: Request, res: Response) => {
    const orders = Object.assign(req.body);

    const workbook = generateWorkbookFromOrders(orders);
    if (req.accepts("application/vnd.ms-excel")) {
      res.setHeader("Content-Type", "application/vnd.ms-exce");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=Report.xlsx"
      );
      workbook.xlsx.write(res).then(() => {
        res.end();
      });
    } else if (req.accepts("text/csv")) {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=Report.csv"
      );
      workbook.csv.write(res).then(() => {
        res.end();
      });
    } else {
      res.status(400).end();
    }
  });
}
