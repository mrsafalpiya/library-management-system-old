import { Router } from "express";
import { type ServerConfig } from "app";
import { JWTAuthorized, MustBeStaff } from "server/middlewares";
import { handleListBooks, handleGetCopy, handleIssueCopy } from "./handlers";
import { validateAndAddToReqBody } from "server/validator";
import { IsNotEmpty } from "class-validator";

export class IssueRequest {
  @IsNotEmpty()
  student_id: number;

  @IsNotEmpty()
  copy_id: string;

  @IsNotEmpty()
  issue_duration_days: number;
}

export function getRouter(serverCfg: ServerConfig): Router {
  const booksRouter = Router();
  booksRouter.use(JWTAuthorized(serverCfg));

  booksRouter.get("/", handleListBooks(serverCfg));
  booksRouter.get("/copy/:registerID", handleGetCopy(serverCfg));
  booksRouter.post(
    "/issue",
    MustBeStaff,
    validateAndAddToReqBody(IssueRequest),
    handleIssueCopy(serverCfg)
  );

  return booksRouter;
}
