import { ServerConfig } from "app";
import { Response, RequestHandler } from "express";
import {
  responseOK,
  responseServerError,
  responseUnauthorized,
} from "server/json";
import { AuthorizedRequest } from "services/users/types";
import { getStudentName } from "./queries";

export function handleCheckIfUserIsValid(
  serverCfg: ServerConfig
): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    let name = "";

    switch (req.user?.id_type) {
      case "student":
        try {
          const queryResponse = await getStudentName.run(
            { studentID: req.user.user_id },
            serverCfg.dbConn
          );
          if (queryResponse.length == 0) {
            responseUnauthorized(res, "user does not exist");
            return;
          }

          name = queryResponse[0].name;
        } catch (e) {
          responseServerError(res, e);
          return;
        }
        break;
      case "staff":
      case "teacher":
      // TODO: Implement in backend first.
    }

    responseOK(res, { name, id_type: req.user?.id_type });
  };
}
