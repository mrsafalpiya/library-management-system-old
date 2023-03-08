/** Types generated for queries found in "src/services/books/queries.sql" */
import { PreparedQuery } from "@pgtyped/runtime";

/** 'ListBooks' parameters type */
export interface IListBooksParams {
  limit?: number | string | null | void;
  offset?: number | string | null | void;
  orderParam?: string | null | void;
  orderSort?: string | null | void;
  searchParam?: string | null | void;
}

/** 'ListBooks' return type */
export interface IListBooksResult {
  author: string;
  id: string;
  publisher: string;
  title: string;
}

/** 'ListBooks' query type */
export interface IListBooksQuery {
  params: IListBooksParams;
  result: IListBooksResult;
}

const listBooksIR: any = {
  usedParamSet: {
    searchParam: true,
    orderParam: true,
    orderSort: true,
    limit: true,
    offset: true,
  },
  params: [
    {
      name: "searchParam",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 83, b: 94 },
        { a: 100, b: 111 },
      ],
    },
    {
      name: "orderParam",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 138, b: 148 },
        { a: 224, b: 234 },
        { a: 312, b: 322 },
        { a: 400, b: 410 },
        { a: 490, b: 500 },
        { a: 584, b: 594 },
      ],
    },
    {
      name: "orderSort",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 164, b: 173 },
        { a: 250, b: 259 },
        { a: 339, b: 348 },
        { a: 427, b: 436 },
        { a: 520, b: 529 },
        { a: 614, b: 623 },
      ],
    },
    {
      name: "limit",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 665, b: 670 }],
    },
    {
      name: "offset",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 679, b: 685 }],
    },
  ],
  statement:
    "SELECT *\nFROM \"books\"\nWHERE to_tsvector('english', title) @@ to_tsquery('english', :searchParam) or :searchParam = ''\nORDER BY (CASE WHEN :orderParam = 'title' AND :orderSort = 'asc' THEN title END) ASC,\n         (CASE WHEN :orderParam = 'title' AND :orderSort = 'desc' THEN title END) DESC,\n         (CASE WHEN :orderParam = 'author' AND :orderSort = 'asc' THEN author END) ASC,\n         (CASE WHEN :orderParam = 'author' AND :orderSort = 'desc' THEN author END) DESC,\n         (CASE WHEN :orderParam = 'publisher' AND :orderSort = 'asc' THEN publisher END) ASC,\n         (CASE WHEN :orderParam = 'publisher' AND :orderSort = 'desc' THEN publisher END) DESC\nLIMIT :limit\nOFFSET :offset",
};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "books"
 * WHERE to_tsvector('english', title) @@ to_tsquery('english', :searchParam) or :searchParam = ''
 * ORDER BY (CASE WHEN :orderParam = 'title' AND :orderSort = 'asc' THEN title END) ASC,
 *          (CASE WHEN :orderParam = 'title' AND :orderSort = 'desc' THEN title END) DESC,
 *          (CASE WHEN :orderParam = 'author' AND :orderSort = 'asc' THEN author END) ASC,
 *          (CASE WHEN :orderParam = 'author' AND :orderSort = 'desc' THEN author END) DESC,
 *          (CASE WHEN :orderParam = 'publisher' AND :orderSort = 'asc' THEN publisher END) ASC,
 *          (CASE WHEN :orderParam = 'publisher' AND :orderSort = 'desc' THEN publisher END) DESC
 * LIMIT :limit
 * OFFSET :offset
 * ```
 */
export const listBooks = new PreparedQuery<IListBooksParams, IListBooksResult>(
  listBooksIR
);

/** 'ListBooksCount' parameters type */
export interface IListBooksCountParams {
  searchParam?: string | null | void;
}

/** 'ListBooksCount' return type */
export interface IListBooksCountResult {
  count: string | null;
}

/** 'ListBooksCount' query type */
export interface IListBooksCountQuery {
  params: IListBooksCountParams;
  result: IListBooksCountResult;
}

const listBooksCountIR: any = {
  usedParamSet: { searchParam: true },
  params: [
    {
      name: "searchParam",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 88, b: 99 },
        { a: 105, b: 116 },
      ],
    },
  ],
  statement:
    "SELECT COUNT(*)\nFROM books\nWHERE to_tsvector('english', title) @@ to_tsquery('english', :searchParam) or :searchParam = ''",
};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(*)
 * FROM books
 * WHERE to_tsvector('english', title) @@ to_tsquery('english', :searchParam) or :searchParam = ''
 * ```
 */
export const listBooksCount = new PreparedQuery<
  IListBooksCountParams,
  IListBooksCountResult
>(listBooksCountIR);

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

/** 'GetCopy' parameters type */
export interface IGetCopyParams {
  registerID?: string | null | void;
}

/** 'GetCopy' return type */
export interface IGetCopyResult {
  author: string;
  borrow_duration_days: number;
  borrowed_date: Date;
  borrower_batch: string;
  borrower_id: string;
  borrower_id_num: string;
  borrower_name: string;
  copy_id: string;
  copy_register_id: string;
  id: string;
  is_borrowed: boolean | null;
  publisher: string;
  title: string;
}

/** 'GetCopy' query type */
export interface IGetCopyQuery {
  params: IGetCopyParams;
  result: IGetCopyResult;
}

const getCopyIR: any = {
  usedParamSet: { registerID: true },
  params: [
    {
      name: "registerID",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 208, b: 218 },
        { a: 754, b: 764 },
      ],
    },
  ],
  statement:
    'SELECT "copies"."id" AS copy_id, "copies"."register_id" as copy_register_id, "books".*, exists(\n\tselect 1\n\tFROM "borrows"\n\tJOIN "copies" ON "borrows"."copy_id" = "copies"."id"\n\tWHERE "copies"."register_id" = :registerID\n) AS is_borrowed, "students"."id" AS borrower_id, "students"."name" AS borrower_name, "students"."id_num" AS borrower_id_num, "batches"."name" AS borrower_batch, "borrows"."created_at" AS borrowed_date, "borrows"."duration_days" AS borrow_duration_days\nFROM "books"\nJOIN "copies" ON "copies"."book_id" = "books"."id"\nLEFT JOIN "borrows" ON "borrows"."copy_id" = "copies"."id"\nLEFT JOIN "students" ON "students"."id" = "borrows"."student_id"\nLEFT JOIN "batches" ON "batches"."id" = "students"."batch_id"\nWHERE "copies"."register_id" = :registerID',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT "copies"."id" AS copy_id, "copies"."register_id" as copy_register_id, "books".*, exists(
 * 	select 1
 * 	FROM "borrows"
 * 	JOIN "copies" ON "borrows"."copy_id" = "copies"."id"
 * 	WHERE "copies"."register_id" = :registerID
 * ) AS is_borrowed, "students"."id" AS borrower_id, "students"."name" AS borrower_name, "students"."id_num" AS borrower_id_num, "batches"."name" AS borrower_batch, "borrows"."created_at" AS borrowed_date, "borrows"."duration_days" AS borrow_duration_days
 * FROM "books"
 * JOIN "copies" ON "copies"."book_id" = "books"."id"
 * LEFT JOIN "borrows" ON "borrows"."copy_id" = "copies"."id"
 * LEFT JOIN "students" ON "students"."id" = "borrows"."student_id"
 * LEFT JOIN "batches" ON "batches"."id" = "students"."batch_id"
 * WHERE "copies"."register_id" = :registerID
 * ```
 */
export const getCopy = new PreparedQuery<IGetCopyParams, IGetCopyResult>(
  getCopyIR
);

/** 'IssueBookBorrows' parameters type */
export interface IIssueBookBorrowsParams {
  copyID?: number | string | null | void;
  durationDays?: number | null | void;
  studentID?: number | string | null | void;
}

/** 'IssueBookBorrows' return type */
export type IIssueBookBorrowsResult = void;

/** 'IssueBookBorrows' query type */
export interface IIssueBookBorrowsQuery {
  params: IIssueBookBorrowsParams;
  result: IIssueBookBorrowsResult;
}

const issueBookBorrowsIR: any = {
  usedParamSet: { copyID: true, studentID: true, durationDays: true },
  params: [
    {
      name: "copyID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 73, b: 79 }],
    },
    {
      name: "studentID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 82, b: 91 }],
    },
    {
      name: "durationDays",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 94, b: 106 }],
    },
  ],
  statement:
    'INSERT INTO "borrows" ("copy_id", "student_id", "duration_days")\nVALUES (:copyID, :studentID, :durationDays)',
};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "borrows" ("copy_id", "student_id", "duration_days")
 * VALUES (:copyID, :studentID, :durationDays)
 * ```
 */
export const issueBookBorrows = new PreparedQuery<
  IIssueBookBorrowsParams,
  IIssueBookBorrowsResult
>(issueBookBorrowsIR);

/** 'IssueBookTransactions' parameters type */
export interface IIssueBookTransactionsParams {
  copyID?: number | string | null | void;
  studentID?: number | string | null | void;
}

/** 'IssueBookTransactions' return type */
export type IIssueBookTransactionsResult = void;

/** 'IssueBookTransactions' query type */
export interface IIssueBookTransactionsQuery {
  params: IIssueBookTransactionsParams;
  result: IIssueBookTransactionsResult;
}

const issueBookTransactionsIR: any = {
  usedParamSet: { copyID: true, studentID: true },
  params: [
    {
      name: "copyID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 91, b: 97 }],
    },
    {
      name: "studentID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 100, b: 109 }],
    },
  ],
  statement:
    'INSERT INTO "transactions" ("transaction_type", "copy_id", "student_id")\nVALUES (\'borrow\', :copyID, :studentID)',
};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "transactions" ("transaction_type", "copy_id", "student_id")
 * VALUES ('borrow', :copyID, :studentID)
 * ```
 */
export const issueBookTransactions = new PreparedQuery<
  IIssueBookTransactionsParams,
  IIssueBookTransactionsResult
>(issueBookTransactionsIR);

/** 'ReturnBookBorrows' parameters type */
export interface IReturnBookBorrowsParams {
  copyID?: number | string | null | void;
}

/** 'ReturnBookBorrows' return type */
export type IReturnBookBorrowsResult = void;

/** 'ReturnBookBorrows' query type */
export interface IReturnBookBorrowsQuery {
  params: IReturnBookBorrowsParams;
  result: IReturnBookBorrowsResult;
}

const returnBookBorrowsIR: any = {
  usedParamSet: { copyID: true },
  params: [
    {
      name: "copyID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 40, b: 46 }],
    },
  ],
  statement: 'DELETE FROM "borrows"\nWHERE "copy_id" = :copyID',
};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM "borrows"
 * WHERE "copy_id" = :copyID
 * ```
 */
export const returnBookBorrows = new PreparedQuery<
  IReturnBookBorrowsParams,
  IReturnBookBorrowsResult
>(returnBookBorrowsIR);

/** 'ReturnBookTransactions' parameters type */
export interface IReturnBookTransactionsParams {
  copyID?: number | string | null | void;
  studentID?: number | string | null | void;
}

/** 'ReturnBookTransactions' return type */
export type IReturnBookTransactionsResult = void;

/** 'ReturnBookTransactions' query type */
export interface IReturnBookTransactionsQuery {
  params: IReturnBookTransactionsParams;
  result: IReturnBookTransactionsResult;
}

const returnBookTransactionsIR: any = {
  usedParamSet: { copyID: true, studentID: true },
  params: [
    {
      name: "copyID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 91, b: 97 }],
    },
    {
      name: "studentID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 100, b: 109 }],
    },
  ],
  statement:
    'INSERT INTO "transactions" ("transaction_type", "copy_id", "student_id")\nVALUES (\'return\', :copyID, :studentID)',
};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO "transactions" ("transaction_type", "copy_id", "student_id")
 * VALUES ('return', :copyID, :studentID)
 * ```
 */
export const returnBookTransactions = new PreparedQuery<
  IReturnBookTransactionsParams,
  IReturnBookTransactionsResult
>(returnBookTransactionsIR);
