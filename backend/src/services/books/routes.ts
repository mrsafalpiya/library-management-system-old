import { Router } from "express";
import { type ServerConfig } from "app";
import { JWTAuthorized } from "server/middlewares";
import { handleListBooks } from "./handlers";

export function registerRoutes(router: Router, serverCfg: ServerConfig) {
  const booksRouter = Router();
  booksRouter.use(JWTAuthorized(serverCfg));

  booksRouter.get("/books", handleListBooks(serverCfg));

  router.use(booksRouter);
}
