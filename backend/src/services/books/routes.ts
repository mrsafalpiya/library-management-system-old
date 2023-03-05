import { Router } from "express";
import { type ServerConfig } from "app";
import { JWTAuthorized } from "server/middlewares";
import { handleListBooks } from "./handlers";

export function getRouter(serverCfg: ServerConfig): Router {
  const booksRouter = Router();
  booksRouter.use(JWTAuthorized(serverCfg));

  booksRouter.get("/", handleListBooks(serverCfg));

  return booksRouter;
}
