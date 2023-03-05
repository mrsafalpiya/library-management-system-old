import { Router } from "express";
import { type ServerConfig } from "app";
import { handleCheckIfUserIsValid } from "./handlers";
import { JWTAuthorized } from "server/middlewares";

export function getRouter(serverCfg: ServerConfig): Router {
  const studentRouter = Router();

  studentRouter.get(
    "/",
    JWTAuthorized(serverCfg),
    handleCheckIfUserIsValid(serverCfg)
  );

  return studentRouter;
}
