import { Router } from "express";
import { type ServerConfig } from "app";
import { JWTAuthorized, MustBeStaff, MustBeStudent } from "server/middlewares";
import {
  handleGetAllReservations,
  handleGetMyReservations,
  handleGetReservationsOfStudent,
  handleRemoveReservation,
  handleReserveBook,
} from "./handlers";

export function getRouter(serverCfg: ServerConfig): Router {
  const booksRouter = Router();
  booksRouter.use(JWTAuthorized(serverCfg));

  booksRouter.get("/", MustBeStaff, handleGetAllReservations(serverCfg));
  booksRouter.get("/my", MustBeStudent, handleGetMyReservations(serverCfg));
  booksRouter.get(
    "/student/:studentID",
    MustBeStaff,
    handleGetReservationsOfStudent(serverCfg)
  );
  booksRouter.post(
    "/book/:bookID",
    MustBeStudent,
    handleReserveBook(serverCfg)
  );
  booksRouter.delete(
    "/:reservationID",
    MustBeStudent,
    handleRemoveReservation(serverCfg)
  );

  return booksRouter;
}
