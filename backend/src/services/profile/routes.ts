import { Router } from "express";
import { type ServerConfig } from "app";
import { JWTAuthorized, MustBeStaff } from "server/middlewares";
import { handleStudentProfile } from "./handlers";

export function getRouter(serverCfg: ServerConfig): Router {
  const profileRouter = Router();
  profileRouter.use(JWTAuthorized(serverCfg));
  profileRouter.use(MustBeStaff);

  profileRouter.get("/student/:studentIDNum", handleStudentProfile(serverCfg));

  return profileRouter;
}
