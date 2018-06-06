import { Application } from "express";
import { BuildController } from "./build";
import { HomeController } from "./home";
import { StatusController } from "./status";

export function registerRoutes(app: Application): void {
    app.use("/api/build", BuildController);
    app.use("/api/status", StatusController);
    app.use("/*", HomeController);
}
