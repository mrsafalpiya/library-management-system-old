import { Router } from "express";
import { type ServerConfig } from "app";
import {
  handleCheckIfUserIsValid,
  handleGetAllStaffs,
  handleGetAllStudents,
} from "./handlers";
import { JWTAuthorized, MustBeStaff } from "server/middlewares";

export function getRouter(serverCfg: ServerConfig): Router {
  const userRouter = Router();
  userRouter.use(JWTAuthorized(serverCfg));

  userRouter.get("/", handleCheckIfUserIsValid(serverCfg));
  userRouter.get("/students", MustBeStaff, handleGetAllStudents(serverCfg));
  userRouter.get("/staffs", MustBeStaff, handleGetAllStaffs(serverCfg));

  return userRouter;
}
