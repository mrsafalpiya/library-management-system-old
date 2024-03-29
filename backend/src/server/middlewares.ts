import { type ServerConfig } from "app";
import { NextFunction, Response } from "express";
import * as jose from "jose";
import { AuthorizedRequest } from "services/users/types";
import { responseBadRequest, responseUnauthorized } from "./json";

export function JWTAuthorized(serverCfg: ServerConfig) {
  return async function (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
  ) {
    let jwt = "";

    // First check if token is available in cookies
    if (req.cookies.jwt) {
      jwt = req.cookies.jwt;
    } else {
      // Else check if its available in headers
      if (req.headers["authorization"]) {
        let authHeader = req.headers["authorization"];
        if (!authHeader.startsWith("Bearer")) {
          responseBadRequest(res, "invalid authorization headers");
          return;
        }
        jwt = authHeader.split(" ").slice(1).join(" ");
      }
    }

    if (jwt == "") {
      responseUnauthorized(res, "no token found");
      return;
    }

    // Now check if the given JWT token is valid
    let token: jose.JWTVerifyResult;

    try {
      token = await jose.jwtVerify(jwt, serverCfg.jwtSecretKey);
    } catch (e) {
      responseUnauthorized(res, "invalid token");
      return;
    }

    req.user = {
      user_id: token.payload.user_id as string,
      id_type: token.payload.id_type as string,
    };

    next();
  };
}

export function MustBeStudent(
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) {
  if (req.user?.id_type != "student") {
    responseUnauthorized(res, "must be student to access this resource");
    return;
  }
  next();
}

export function MustBeStaff(
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) {
  if (req.user?.id_type != "staff") {
    responseUnauthorized(res, "must be staff to access this resource");
    return;
  }
  next();
}

export function MustBeEitherStudentOrStaff(
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) {
  const idType = req.user?.id_type;

  if (idType != "student" && idType != "staff") {
    responseUnauthorized(
      res,
      "must be student or staff to access this resource"
    );
    return;
  }
  next();
}
