import { Router } from "express";
import { handleLogin } from "./handlers";
import { type ServerConfig } from "app";
import { makeValidateBody } from "server/validator";
import { IsIn, IsNotEmpty } from "class-validator";
import { possibleIDTypes, type IDType } from "services/users/types";

export class LoginRequest {
  @IsNotEmpty()
  @IsIn(possibleIDTypes)
  id_type: IDType;

  @IsNotEmpty()
  id_num: string;

  @IsNotEmpty()
  password: string;
}

export function getRouter(serverCfg: ServerConfig): Router {
  const authRouter = Router();

  authRouter.post(
    "/login",
    makeValidateBody(LoginRequest),
    handleLogin(serverCfg)
  );

  return authRouter;
}
