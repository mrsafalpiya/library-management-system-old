import { ServerConfig } from "app";
import { Response, RequestHandler } from "express";
import {
  responseBadRequest,
  responseOK,
  responseServerError,
} from "server/json";
import { AuthorizedRequest } from "services/users/types";
import { getStaffDashboardProfile, getStaffDashboardStats } from "./queries";

export function handleDashboard(serverCfg: ServerConfig): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    // Query about the user

    type outputUserType = {
      name: string;
      id_num: string;
      id_type: string;
    };
    let outputUser: outputUserType = {
      name: "",
      id_num: "",
      id_type: "staff",
    };

    try {
      const queryResponse = await getStaffDashboardProfile.run(
        { staffID: req.user?.user_id },
        serverCfg.dbConn
      );
      if (queryResponse.length == 0) {
        responseBadRequest(res, "staff does not exist");
        return;
      }

      outputUser.name = queryResponse[0].name;
      outputUser.id_num = queryResponse[0].id_num;
    } catch (e) {
      responseServerError(res, e);
      return;
    }

    // Query stats

    type outputStatsType = {
      books_count: number;
      copies_count: number;
      students_count: number;
      staffs_count: number;
      reservations_count: number;
    };
    let outputStats: outputStatsType = {
      books_count: 0,
      copies_count: 0,
      students_count: 0,
      staffs_count: 0,
      reservations_count: 0,
    };

    try {
      const queryResponse = await getStaffDashboardStats.run(
        undefined,
        serverCfg.dbConn
      );

      outputStats.books_count = parseInt(
        queryResponse[0].books_count as string
      );
      outputStats.copies_count = parseInt(
        queryResponse[0].copies_count as string
      );
      outputStats.students_count = parseInt(
        queryResponse[0].students_count as string
      );
      outputStats.staffs_count = parseInt(
        queryResponse[0].staffs_count as string
      );
      outputStats.reservations_count = parseInt(
        queryResponse[0].reservations_count as string
      );
    } catch (e) {
      responseServerError(res, e);
      return;
    }

    responseOK(res, {
      user: outputUser,
      stats: outputStats,
    });
  };
}
