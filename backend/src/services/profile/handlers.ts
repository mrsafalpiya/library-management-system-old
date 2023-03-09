import { ServerConfig } from "app";
import { Response, RequestHandler } from "express";
import { responseNotFound, responseOK, responseServerError } from "server/json";
import { getBorrowsDetailFromQueryResult } from "services/student/helpers";
import { getStudentDashboardBorrows } from "services/student/queries";
import { outputBorrowType } from "services/student/types";
import { AuthorizedRequest } from "services/users/types";
import { getStudentDetails } from "./queries";

export function handleStudentProfile(serverCfg: ServerConfig): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    // Query about the user

    type outputUserType = {
      id: number;
      name: string;
      id_num: string;
      address: string;
      contact: string;
      email: string;
      batch: string;
    };
    let outputUser: outputUserType = {
      id: 0,
      name: "",
      id_num: "",
      address: "",
      contact: "",
      email: "",
      batch: "",
    };

    try {
      const queryResponse = await getStudentDetails.run(
        { studentIDNum: req.params.studentIDNum },
        serverCfg.dbConn
      );
      if (queryResponse.length == 0) {
        responseNotFound(res, "student does not exist");
        return;
      }

      outputUser.id = parseInt(queryResponse[0].id);
      outputUser.name = queryResponse[0].name;
      outputUser.id_num = queryResponse[0].id_num;
      outputUser.address = queryResponse[0].address;
      outputUser.contact = queryResponse[0].contact;
      outputUser.email = queryResponse[0].email;
      outputUser.batch = queryResponse[0].batch;
    } catch (e) {
      responseServerError(res, e);
      return;
    }

    // Query about the borrows

    let outputBorrows: outputBorrowType = {
      borrows_count: 0,
      has_late_borrows: false,
      list: [],
    };

    try {
      const queryResponse = await getStudentDashboardBorrows.run(
        { studentID: outputUser.id },
        serverCfg.dbConn
      );

      outputBorrows = getBorrowsDetailFromQueryResult(queryResponse);
    } catch (e) {
      responseServerError(res, e);
      return;
    }

    responseOK(res, {
      user: outputUser,
      borrows: outputBorrows,
    });
  };
}
