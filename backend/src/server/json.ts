import { Response } from "express";
import log4js from "log4js";

const logger = log4js.getLogger();

export function responseJSON(res: Response, status: number, data: any) {
  res.status(status);
  res.send(data);
}

export function responseOK(res: Response, body: any) {
  responseJSON(res, 200, body);
}

export function responseAlreadyExists(res: Response, errorMessage: string) {
  responseJSON(res, 409, { error: errorMessage });
}

export function responseBadRequest(res: Response, errorMessage: string) {
  responseJSON(res, 400, { error: errorMessage });
}

export function responseServerError(res: Response, errorMessage: any) {
  console.log(errorMessage);
  responseJSON(res, 500, { error: "oops! unexpected error" });
}

export function responseUnauthorized(res: Response, errorMessage: any) {
  responseJSON(res, 401, { error: errorMessage });
}

export function responseConflict(res: Response, errorMessage: any) {
  responseJSON(res, 409, { error: errorMessage });
}
