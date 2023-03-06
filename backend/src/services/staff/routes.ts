import { Router } from "express";
import { type ServerConfig } from "app";
import { JWTAuthorized, MustBeStaff } from "server/middlewares";
import { handleDashboard } from "./handlers";

export function getRouter(serverCfg: ServerConfig): Router {
  const staffRouter = Router();
  staffRouter.use(JWTAuthorized(serverCfg));
  staffRouter.use(MustBeStaff);

  staffRouter.get("/dashboard", handleDashboard(serverCfg));

  return staffRouter;
}
