import { ServerConfig } from "app";
import { Response, RequestHandler } from "express";
import { DatabaseError } from "pg";
import {
  responseBadRequest,
  responseConflict,
  responseOK,
  responseServerError,
} from "server/json";
import { AuthorizedRequest } from "services/users/types";
import {
  addReservation,
  getAllReservations,
  getReservationsOfStudent,
  removeReservation,
} from "./queries";

export function handleGetAllReservations(
  serverCfg: ServerConfig
): RequestHandler {
  return async function (_req: AuthorizedRequest, res: Response) {
    try {
      const queryResponse = await getAllReservations.run(
        undefined,
        serverCfg.dbConn
      );
      responseOK(res, { reservations: queryResponse });
      return;
    } catch (e) {
      responseServerError(res, e);
      return;
    }
  };
}

export function handleGetReservationsOfStudent(
  serverCfg: ServerConfig
): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    try {
      const queryResponse = await getReservationsOfStudent.run(
        { studentID: req.params.studentID },
        serverCfg.dbConn
      );
      responseOK(res, { reservations: queryResponse });
      return;
    } catch (e) {
      responseServerError(res, e);
      return;
    }
  };
}

export function handleReserveBook(serverCfg: ServerConfig): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    const bookID = parseInt(req.params.bookID);
    if (isNaN(bookID)) {
      responseBadRequest(res, "invalid book ID");
      return;
    }

    try {
      await addReservation.run(
        {
          studentID: req.user?.user_id,
          bookID: bookID,
        },
        serverCfg.dbConn
      );
    } catch (e) {
      const dbErr = e as DatabaseError;
      switch (dbErr.code) {
        case "23503":
          responseBadRequest(res, "book with the given ID does not exist");
          break;
        case "23505":
          responseConflict(
            res,
            "the current user has already reserved this book"
          );
          break;
        default:
          responseServerError(res, e);
      }
      return;
    }

    responseOK(res, { response: "ok" });
  };
}

export function handleGetMyReservations(
  serverCfg: ServerConfig
): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    try {
      const queryResponse = await getReservationsOfStudent.run(
        { studentID: req.user?.user_id },
        serverCfg.dbConn
      );
      responseOK(res, { reservations: queryResponse });
      return;
    } catch (e) {
      responseServerError(res, e);
      return;
    }
  };
}

export function handleRemoveReservation(
  serverCfg: ServerConfig
): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    const reservationID = parseInt(req.params.reservationID);
    if (isNaN(reservationID)) {
      responseBadRequest(res, "invalid reservation ID");
      return;
    }

    try {
      await removeReservation.run(
        {
          reservationID,
        },
        serverCfg.dbConn
      );
    } catch (e) {
      responseServerError(res, e);
      return;
    }

    responseOK(res, { response: "ok" });
  };
}
