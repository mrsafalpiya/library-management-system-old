/** Types generated for queries found in "src/services/reservations/queries.sql" */
import { PreparedQuery } from "@pgtyped/runtime";

/** 'GetAllReservations' parameters type */
export type IGetAllReservationsParams = void;

/** 'GetAllReservations' return type */
export interface IGetAllReservationsResult {
  book_author: string;
  book_id: string;
  book_publisher: string;
  book_title: string;
  created_at: Date;
  student_id: string;
  student_name: string;
}

/** 'GetAllReservations' query type */
export interface IGetAllReservationsQuery {
  params: IGetAllReservationsParams;
  result: IGetAllReservationsResult;
}

const getAllReservationsIR: any = {
  usedParamSet: {},
  params: [],
  statement:
    'SELECT "students"."id" AS student_id, "students"."name" AS student_name, "books"."id" AS book_id, "books"."title" AS book_title, "books"."author" AS book_author, "books"."publisher" AS book_publisher, "reservations"."created_at"\nFROM "reservations"\nJOIN "students" ON "students"."id" = "reservations"."student_id"\nJOIN "books" ON "books"."id" = "reservations"."book_id"',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT "students"."id" AS student_id, "students"."name" AS student_name, "books"."id" AS book_id, "books"."title" AS book_title, "books"."author" AS book_author, "books"."publisher" AS book_publisher, "reservations"."created_at"
 * FROM "reservations"
 * JOIN "students" ON "students"."id" = "reservations"."student_id"
 * JOIN "books" ON "books"."id" = "reservations"."book_id"
 * ```
 */
export const getAllReservations = new PreparedQuery<
  IGetAllReservationsParams,
  IGetAllReservationsResult
>(getAllReservationsIR);

/** 'GetReservationsOfStudent' parameters type */
export interface IGetReservationsOfStudentParams {
  studentID?: number | string | null | void;
}

/** 'GetReservationsOfStudent' return type */
export interface IGetReservationsOfStudentResult {
  author: string;
  book_id: string;
  created_at: Date;
  id: string;
  publisher: string;
  title: string;
}

/** 'GetReservationsOfStudent' query type */
export interface IGetReservationsOfStudentQuery {
  params: IGetReservationsOfStudentParams;
  result: IGetReservationsOfStudentResult;
}

const getReservationsOfStudentIR: any = {
  usedParamSet: { studentID: true },
  params: [
    {
      name: "studentID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 302, b: 311 }],
    },
  ],
  statement:
    'SELECT "reservations"."id", "books"."id" AS book_id, "books"."title", "books"."author", "books"."publisher", "reservations"."created_at"\nFROM "reservations"\nJOIN "students" ON "students"."id" = "reservations"."student_id"\nJOIN "books" ON "books"."id" = "reservations"."book_id"\nWHERE "students"."id" = :studentID',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT "reservations"."id", "books"."id" AS book_id, "books"."title", "books"."author", "books"."publisher", "reservations"."created_at"
 * FROM "reservations"
 * JOIN "students" ON "students"."id" = "reservations"."student_id"
 * JOIN "books" ON "books"."id" = "reservations"."book_id"
 * WHERE "students"."id" = :studentID
 * ```
 */
export const getReservationsOfStudent = new PreparedQuery<
  IGetReservationsOfStudentParams,
  IGetReservationsOfStudentResult
>(getReservationsOfStudentIR);

/** 'AddReservation' parameters type */
export interface IAddReservationParams {
  bookID?: number | string | null | void;
  studentID?: number | string | null | void;
}

/** 'AddReservation' return type */
export type IAddReservationResult = void;

/** 'AddReservation' query type */
export interface IAddReservationQuery {
  params: IAddReservationParams;
  result: IAddReservationResult;
}

const addReservationIR: any = {
  usedParamSet: { bookID: true, studentID: true },
  params: [
    {
      name: "bookID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 63, b: 69 }],
    },
    {
      name: "studentID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 73, b: 82 }],
    },
  ],
  statement:
    'INSERT INTO "reservations" (\n\tbook_id,\n\tstudent_id\n) VALUES (\n\t:bookID,\n\t:studentID\n)',
};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "reservations" (
 * 	book_id,
 * 	student_id
 * ) VALUES (
 * 	:bookID,
 * 	:studentID
 * )
 * ```
 */
export const addReservation = new PreparedQuery<
  IAddReservationParams,
  IAddReservationResult
>(addReservationIR);

/** 'RemoveReservation' parameters type */
export interface IRemoveReservationParams {
  reservationID?: number | string | null | void;
}

/** 'RemoveReservation' return type */
export type IRemoveReservationResult = void;

/** 'RemoveReservation' query type */
export interface IRemoveReservationQuery {
  params: IRemoveReservationParams;
  result: IRemoveReservationResult;
}

const removeReservationIR: any = {
  usedParamSet: { reservationID: true },
  params: [
    {
      name: "reservationID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 55, b: 68 }],
    },
  ],
  statement:
    'DELETE FROM "reservations"\nWHERE "reservations"."id" = :reservationID',
};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM "reservations"
 * WHERE "reservations"."id" = :reservationID
 * ```
 */
export const removeReservation = new PreparedQuery<
  IRemoveReservationParams,
  IRemoveReservationResult
>(removeReservationIR);
