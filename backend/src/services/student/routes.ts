import { Router } from "express";
import { type ServerConfig } from "app";
import { JWTAuthorized, MustBeStudent } from "server/middlewares";
import {
  handleDashboard,
  handleListTransactions,
  handleGetProfile,
  handleUpdateProfileDetails,
  handleUpdatePassword,
} from "./handlers";
import { validateAndAddToReqBody } from "server/validator";
import { IsNotEmpty } from "class-validator";

export class UpdateRequest {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  email: string;
}

export class PasswordRequest {
  @IsNotEmpty()
  old_password: string;

  @IsNotEmpty()
  new_password: string;
}

export function getRouter(serverCfg: ServerConfig): Router {
  const studentRouter = Router();
  studentRouter.use(JWTAuthorized(serverCfg));
  studentRouter.use(MustBeStudent);

  studentRouter.get("/dashboard", handleDashboard(serverCfg));
  studentRouter.get("/transaction", handleListTransactions(serverCfg));
  studentRouter.get("/profile", handleGetProfile(serverCfg));
  studentRouter.post(
    "/profile/details",
    validateAndAddToReqBody(UpdateRequest),
    handleUpdateProfileDetails(serverCfg)
  );
  studentRouter.post(
    "/profile/password",
    validateAndAddToReqBody(PasswordRequest),
    handleUpdatePassword(serverCfg)
  );

  return studentRouter;
}
