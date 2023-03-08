import { Router } from "express";
import { type ServerConfig } from "app";
import {
  handleCheckIfUserIsValid,
  handleGetAllStaffs,
  handleGetAllStudents,
  handleGetStudentInfo,
} from "./handlers";
import { JWTAuthorized, MustBeStaff } from "server/middlewares";

export function getRouter(serverCfg: ServerConfig): Router {
  const userRouter = Router();
  userRouter.use(JWTAuthorized(serverCfg));

  userRouter.get("/", handleCheckIfUserIsValid(serverCfg));

  // Accessible only to staffs

  userRouter.use(MustBeStaff);

  userRouter.get("/student/:studentIDNum", handleGetStudentInfo(serverCfg));

  userRouter.get("/students", handleGetAllStudents(serverCfg));
  userRouter.get("/staffs", handleGetAllStaffs(serverCfg));

  return userRouter;
}
