import type { Application } from "express";
import sheet from "./sheet";

export default function registerControllers(app: Application) {
  sheet(app);
}
