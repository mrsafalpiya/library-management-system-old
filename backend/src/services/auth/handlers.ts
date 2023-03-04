import { Request, Response, RequestHandler } from "express";
import { ServerConfig } from "app";
import { LoginRequest } from "./routes";
import { loginStudent } from "./queries";
import {
  responseOK,
  responseServerError,
  responseUnauthorized,
} from "server/json";
import bcrypt from "bcrypt";
import * as jose from "jose";

export function handleLogin(serverCfg: ServerConfig): RequestHandler {
  return async function (req: Request, res: Response) {
    let requestBody = req.body as LoginRequest;

    let { id_num, id_type, password } = requestBody;

    let userID: string = "0";
    let passwordHashed: string = "";

    // Check if a user with the given ID number in the given ID type already exists.
    // Also get the hashed password of the user.

    switch (requestBody.id_type) {
      case "student":
        try {
          let studentID = await loginStudent.run(
            {
              idNum: id_num,
            },
            serverCfg.dbConn
          );

          if (studentID.length == 0) {
            responseUnauthorized(res, "invalid credentials");
            return;
          }

          userID = studentID[0].id;
          passwordHashed = studentID[0].password_hashed;
        } catch (e) {
          responseServerError(res, e);
          return;
        }
        break;
    }

    // Check if the password is correct.
    const isPasswordCorrect = await bcrypt.compare(password, passwordHashed);
    if (!isPasswordCorrect) {
      responseUnauthorized(res, "invalid credentials");
      return;
    }

    // Generate JWT

    const secret = new TextEncoder().encode(serverCfg.jwtSecretKey);
    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

    const jwt = new jose.SignJWT({
      user_id: userID,
      id_type: id_type,
      exp: exp,
    }).setProtectedHeader({ alg: "HS256" });
    const token = await jwt.sign(secret);

    responseOK(res, { token: token, expires: new Date(exp * 1000) });
  };
}
