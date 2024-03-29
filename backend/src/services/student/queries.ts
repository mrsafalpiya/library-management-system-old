/** Types generated for queries found in "src/services/student/queries.sql" */
import { PreparedQuery } from "@pgtyped/runtime";

/** 'GetStudentDashboardProfile' parameters type */
export interface IGetStudentDashboardProfileParams {
  studentID?: number | string | null | void;
}

/** 'GetStudentDashboardProfile' return type */
export interface IGetStudentDashboardProfileResult {
  batch: string;
  id_num: string;
  name: string;
}

/** 'GetStudentDashboardProfile' query type */
export interface IGetStudentDashboardProfileQuery {
  params: IGetStudentDashboardProfileParams;
  result: IGetStudentDashboardProfileResult;
}

const getStudentDashboardProfileIR: any = {
  usedParamSet: { studentID: true },
  params: [
    {
      name: "studentID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 147, b: 156 }],
    },
  ],
  statement:
    "SELECT students.name, students.id_num, batches.name as batch\nFROM students\nLEFT JOIN batches ON batches.id = students.batch_id\nWHERE students.id = :studentID",
};

/**
 * Query generated from SQL:
 * ```
 * SELECT students.name, students.id_num, batches.name as batch
 * FROM students
 * LEFT JOIN batches ON batches.id = students.batch_id
 * WHERE students.id = :studentID
 * ```
 */
export const getStudentDashboardProfile = new PreparedQuery<
  IGetStudentDashboardProfileParams,
  IGetStudentDashboardProfileResult
>(getStudentDashboardProfileIR);

/** 'GetStudentDashboardTransactions' parameters type */
export interface IGetStudentDashboardTransactionsParams {
  studentID?: number | string | null | void;
}

/** 'GetStudentDashboardTransactions' return type */
export interface IGetStudentDashboardTransactionsResult {
  created_at: Date;
  title: string;
  transaction_type: string;
}

/** 'GetStudentDashboardTransactions' query type */
export interface IGetStudentDashboardTransactionsQuery {
  params: IGetStudentDashboardTransactionsParams;
  result: IGetStudentDashboardTransactionsResult;
}

const getStudentDashboardTransactionsIR: any = {
  usedParamSet: { studentID: true },
  params: [
    {
      name: "studentID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 187, b: 196 }],
    },
  ],
  statement:
    "SELECT transactions.transaction_type, books.title, created_at\nFROM transactions\nJOIN copies ON copies.id = transactions.copy_id\nJOIN books ON books.id = copies.book_id\nWHERE student_id = :studentID\nORDER BY transactions.id DESC\nLIMIT 4",
};

/**
 * Query generated from SQL:
 * ```
 * SELECT transactions.transaction_type, books.title, created_at
 * FROM transactions
 * JOIN copies ON copies.id = transactions.copy_id
 * JOIN books ON books.id = copies.book_id
 * WHERE student_id = :studentID
 * ORDER BY transactions.id DESC
 * LIMIT 4
 * ```
 */
export const getStudentDashboardTransactions = new PreparedQuery<
  IGetStudentDashboardTransactionsParams,
  IGetStudentDashboardTransactionsResult
>(getStudentDashboardTransactionsIR);

/** 'GetStudentDashboardBorrows' parameters type */
export interface IGetStudentDashboardBorrowsParams {
  studentID?: number | string | null | void;
}

/** 'GetStudentDashboardBorrows' return type */
export interface IGetStudentDashboardBorrowsResult {
  author: string;
  issue_date: Date;
  issue_duration_days: number;
  publisher: string;
  register_id: string;
  title: string;
}

/** 'GetStudentDashboardBorrows' query type */
export interface IGetStudentDashboardBorrowsQuery {
  params: IGetStudentDashboardBorrowsParams;
  result: IGetStudentDashboardBorrowsResult;
}

const getStudentDashboardBorrowsIR: any = {
  usedParamSet: { studentID: true },
  params: [
    {
      name: "studentID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 273, b: 282 }],
    },
  ],
  statement:
    "SELECT copies.register_id, books.title, books.author, books.publisher, borrows.created_at as issue_date, borrows.duration_days as issue_duration_days\nFROM borrows\nJOIN copies ON copies.id = borrows.copy_id\nJOIN books ON books.id = copies.book_id\nWHERE borrows.student_id = :studentID\nORDER BY issue_date DESC",
};

/**
 * Query generated from SQL:
 * ```
 * SELECT copies.register_id, books.title, books.author, books.publisher, borrows.created_at as issue_date, borrows.duration_days as issue_duration_days
 * FROM borrows
 * JOIN copies ON copies.id = borrows.copy_id
 * JOIN books ON books.id = copies.book_id
 * WHERE borrows.student_id = :studentID
 * ORDER BY issue_date DESC
 * ```
 */
export const getStudentDashboardBorrows = new PreparedQuery<
  IGetStudentDashboardBorrowsParams,
  IGetStudentDashboardBorrowsResult
>(getStudentDashboardBorrowsIR);

/** 'GetStudentTransactions' parameters type */
export interface IGetStudentTransactionsParams {
  limit?: number | string | null | void;
  offset?: number | string | null | void;
  studentID?: number | string | null | void;
  transactionType?: string | null | void;
}

/** 'GetStudentTransactions' return type */
export interface IGetStudentTransactionsResult {
  book_name: string;
  date_time: Date;
  type: string;
}

/** 'GetStudentTransactions' query type */
export interface IGetStudentTransactionsQuery {
  params: IGetStudentTransactionsParams;
  result: IGetStudentTransactionsResult;
}

const getStudentTransactionsIR: any = {
  usedParamSet: {
    studentID: true,
    transactionType: true,
    limit: true,
    offset: true,
  },
  params: [
    {
      name: "studentID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 221, b: 230 }],
    },
    {
      name: "transactionType",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 237, b: 252 },
        { a: 338, b: 353 },
      ],
    },
    {
      name: "limit",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 386, b: 391 }],
    },
    {
      name: "offset",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 400, b: 406 }],
    },
  ],
  statement:
    "SELECT transactions.transaction_type as type, books.title as book_name, created_at as date_time\nFROM transactions\nJOIN copies ON copies.id = transactions.copy_id\nJOIN books ON books.id = copies.book_id\nWHERE student_id = :studentID AND (:transactionType ~* 'other' AND transaction_type NOT IN ('return', 'borrow')) OR transaction_type ~* :transactionType\nORDER BY created_at desc\nLIMIT :limit\nOFFSET :offset",
};

/**
 * Query generated from SQL:
 * ```
 * SELECT transactions.transaction_type as type, books.title as book_name, created_at as date_time
 * FROM transactions
 * JOIN copies ON copies.id = transactions.copy_id
 * JOIN books ON books.id = copies.book_id
 * WHERE student_id = :studentID AND (:transactionType ~* 'other' AND transaction_type NOT IN ('return', 'borrow')) OR transaction_type ~* :transactionType
 * ORDER BY created_at desc
 * LIMIT :limit
 * OFFSET :offset
 * ```
 */
export const getStudentTransactions = new PreparedQuery<
  IGetStudentTransactionsParams,
  IGetStudentTransactionsResult
>(getStudentTransactionsIR);

/** 'GetStudentTransactionsCount' parameters type */
export interface IGetStudentTransactionsCountParams {
  studentID?: number | string | null | void;
  transactionType?: string | null | void;
}

/** 'GetStudentTransactionsCount' return type */
export interface IGetStudentTransactionsCountResult {
  count: string | null;
}

/** 'GetStudentTransactionsCount' query type */
export interface IGetStudentTransactionsCountQuery {
  params: IGetStudentTransactionsCountParams;
  result: IGetStudentTransactionsCountResult;
}

const getStudentTransactionsCountIR: any = {
  usedParamSet: { studentID: true, transactionType: true },
  params: [
    {
      name: "studentID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 141, b: 150 }],
    },
    {
      name: "transactionType",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 176, b: 191 }],
    },
  ],
  statement:
    "SELECT COUNT(*)\nFROM transactions\nJOIN copies ON copies.id = transactions.copy_id\nJOIN books ON books.id = copies.book_id\nWHERE student_id = :studentID AND transaction_type ~* :transactionType",
};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(*)
 * FROM transactions
 * JOIN copies ON copies.id = transactions.copy_id
 * JOIN books ON books.id = copies.book_id
 * WHERE student_id = :studentID AND transaction_type ~* :transactionType
 * ```
 */
export const getStudentTransactionsCount = new PreparedQuery<
  IGetStudentTransactionsCountParams,
  IGetStudentTransactionsCountResult
>(getStudentTransactionsCountIR);

/** 'GetStudentProfile' parameters type */
export interface IGetStudentProfileParams {
  studentID?: number | string | null | void;
}

/** 'GetStudentProfile' return type */
export interface IGetStudentProfileResult {
  address: string;
  contact: string;
  email: string;
}

/** 'GetStudentProfile' query type */
export interface IGetStudentProfileQuery {
  params: IGetStudentProfileParams;
  result: IGetStudentProfileResult;
}

const getStudentProfileIR: any = {
  usedParamSet: { studentID: true },
  params: [
    {
      name: "studentID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 99, b: 108 }],
    },
  ],
  statement:
    'SELECT "students"."address", "students"."contact", "students"."email"\nFROM "students"\nWHERE "id" = :studentID',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT "students"."address", "students"."contact", "students"."email"
 * FROM "students"
 * WHERE "id" = :studentID
 * ```
 */
export const getStudentProfile = new PreparedQuery<
  IGetStudentProfileParams,
  IGetStudentProfileResult
>(getStudentProfileIR);

/** 'UpdateStudentProfileDetails' parameters type */
export interface IUpdateStudentProfileDetailsParams {
  address?: string | null | void;
  contact?: string | null | void;
  email?: string | null | void;
  studentID?: number | string | null | void;
}

/** 'UpdateStudentProfileDetails' return type */
export type IUpdateStudentProfileDetailsResult = void;

/** 'UpdateStudentProfileDetails' query type */
export interface IUpdateStudentProfileDetailsQuery {
  params: IUpdateStudentProfileDetailsParams;
  result: IUpdateStudentProfileDetailsResult;
}

const updateStudentProfileDetailsIR: any = {
  usedParamSet: { address: true, contact: true, email: true, studentID: true },
  params: [
    {
      name: "address",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 35, b: 42 }],
    },
    {
      name: "contact",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 58, b: 65 }],
    },
    {
      name: "email",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 79, b: 84 }],
    },
    {
      name: "studentID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 99, b: 108 }],
    },
  ],
  statement:
    'UPDATE "students"\nSET\n\t"address" = :address,\n\t"contact" = :contact,\n\t"email" = :email\nWHERE "id" = :studentID',
};

/**
 * Query generated from SQL:
 * ```
 * UPDATE "students"
 * SET
 * 	"address" = :address,
 * 	"contact" = :contact,
 * 	"email" = :email
 * WHERE "id" = :studentID
 * ```
 */
export const updateStudentProfileDetails = new PreparedQuery<
  IUpdateStudentProfileDetailsParams,
  IUpdateStudentProfileDetailsResult
>(updateStudentProfileDetailsIR);

/** 'GetStudentPasswordHashed' parameters type */
export interface IGetStudentPasswordHashedParams {
  studentID?: number | string | null | void;
}

/** 'GetStudentPasswordHashed' return type */
export interface IGetStudentPasswordHashedResult {
  password_hashed: string;
}

/** 'GetStudentPasswordHashed' query type */
export interface IGetStudentPasswordHashedQuery {
  params: IGetStudentPasswordHashedParams;
  result: IGetStudentPasswordHashedResult;
}

const getStudentPasswordHashedIR: any = {
  usedParamSet: { studentID: true },
  params: [
    {
      name: "studentID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 65, b: 74 }],
    },
  ],
  statement:
    'SELECT "students"."password_hashed"\nFROM "students"\nWHERE "id" = :studentID',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT "students"."password_hashed"
 * FROM "students"
 * WHERE "id" = :studentID
 * ```
 */
export const getStudentPasswordHashed = new PreparedQuery<
  IGetStudentPasswordHashedParams,
  IGetStudentPasswordHashedResult
>(getStudentPasswordHashedIR);

/** 'UpdateStudentPassword' parameters type */
export interface IUpdateStudentPasswordParams {
  passwordHashed?: string | null | void;
  studentID?: number | string | null | void;
}

/** 'UpdateStudentPassword' return type */
export type IUpdateStudentPasswordResult = void;

/** 'UpdateStudentPassword' query type */
export interface IUpdateStudentPasswordQuery {
  params: IUpdateStudentPasswordParams;
  result: IUpdateStudentPasswordResult;
}

const updateStudentPasswordIR: any = {
  usedParamSet: { passwordHashed: true, studentID: true },
  params: [
    {
      name: "passwordHashed",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 42, b: 56 }],
    },
    {
      name: "studentID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 71, b: 80 }],
    },
  ],
  statement:
    'UPDATE "students"\nSET "password_hashed" = :passwordHashed\nWHERE "id" = :studentID',
};

/**
 * Query generated from SQL:
 * ```
 * UPDATE "students"
 * SET "password_hashed" = :passwordHashed
 * WHERE "id" = :studentID
 * ```
 */
export const updateStudentPassword = new PreparedQuery<
  IUpdateStudentPasswordParams,
  IUpdateStudentPasswordResult
>(updateStudentPasswordIR);
