import { Router } from "express";
import { type ServerConfig } from "app";
import { JWTAuthorized, MustBeStaff } from "server/middlewares";
import {
  handleListBooks,
  handleGetCopy,
  handleIssueCopy,
  handleReturnCopy,
  handleRenew,
} from "./handlers";
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

export class ReturnRequest {
  @IsNotEmpty()
  student_id: number;

  @IsNotEmpty()
  copy_id: string;
}

export function getRouter(serverCfg: ServerConfig): Router {
  const booksRouter = Router();
  booksRouter.use(JWTAuthorized(serverCfg));

  booksRouter.get("/", handleListBooks(serverCfg));

  // Accessible only to staffs.

  booksRouter.use(MustBeStaff);

  booksRouter.get("/copy/:registerID", handleGetCopy(serverCfg));
  booksRouter.post(
    "/issue",
    validateAndAddToReqBody(IssueRequest),
    handleIssueCopy(serverCfg)
  );
  booksRouter.post(
    "/return",
    validateAndAddToReqBody(ReturnRequest),
    handleReturnCopy(serverCfg)
  );
  booksRouter.post(
    "/renew",
    validateAndAddToReqBody(IssueRequest),
    handleRenew(serverCfg)
  );

  return booksRouter;
}
