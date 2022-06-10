import sheet from "./sheet";
import { Application } from "express";

export default function registerControllers(app: Application) {
  sheet(app);
}
