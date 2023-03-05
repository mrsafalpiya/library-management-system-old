import { Router } from "express";
import { type ServerConfig } from "app";
import { JWTAuthorized, MustBeStudent } from "server/middlewares";
import { handleDashboard, handleListTransactions } from "./handlers";

export function getRouter(serverCfg: ServerConfig): Router {
  const studentRouter = Router();
  studentRouter.use(JWTAuthorized(serverCfg));
  studentRouter.use(MustBeStudent);

  studentRouter.get("/dashboard", handleDashboard(serverCfg));
  studentRouter.get("/transaction", handleListTransactions(serverCfg));

  return studentRouter;
}
