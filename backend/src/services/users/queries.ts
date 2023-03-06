/** Types generated for queries found in "src/services/users/queries.sql" */
import { PreparedQuery } from "@pgtyped/runtime";

/** 'GetStudentName' parameters type */
export interface IGetStudentNameParams {
  studentID?: number | string | null | void;
}

/** 'GetStudentName' return type */
export interface IGetStudentNameResult {
  name: string;
}

/** 'GetStudentName' query type */
export interface IGetStudentNameQuery {
  params: IGetStudentNameParams;
  result: IGetStudentNameResult;
}

const getStudentNameIR: any = {
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
    'SELECT "students"."name"\nFROM "students"\nWHERE "students"."id" = :studentID',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT "students"."name"
 * FROM "students"
 * WHERE "students"."id" = :studentID
 * ```
 */
export const getStudentName = new PreparedQuery<
  IGetStudentNameParams,
  IGetStudentNameResult
>(getStudentNameIR);

/** 'GetStaffName' parameters type */
export interface IGetStaffNameParams {
  staffID?: number | string | null | void;
}

/** 'GetStaffName' return type */
export interface IGetStaffNameResult {
  name: string;
}

/** 'GetStaffName' query type */
export interface IGetStaffNameQuery {
  params: IGetStaffNameParams;
  result: IGetStaffNameResult;
}

const getStaffNameIR: any = {
  usedParamSet: { staffID: true },
  params: [
    {
      name: "staffID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 59, b: 66 }],
    },
  ],
  statement:
    'SELECT "staffs"."name"\nFROM "staffs"\nWHERE "staffs"."id" = :staffID',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT "staffs"."name"
 * FROM "staffs"
 * WHERE "staffs"."id" = :staffID
 * ```
 */
export const getStaffName = new PreparedQuery<
  IGetStaffNameParams,
  IGetStaffNameResult
>(getStaffNameIR);

/** 'GetAllStudents' parameters type */
export interface IGetAllStudentsParams {
  limit?: number | string | null | void;
  offset?: number | string | null | void;
  orderParam?: string | null | void;
  orderSort?: string | null | void;
  searchParam?: string | null | void;
}

/** 'GetAllStudents' return type */
export interface IGetAllStudentsResult {
  batch: string;
  id_num: string;
  name: string;
}

/** 'GetAllStudents' query type */
export interface IGetAllStudentsQuery {
  params: IGetAllStudentsParams;
  result: IGetAllStudentsResult;
}

const getAllStudentsIR: any = {
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
        { a: 215, b: 226 },
        { a: 232, b: 243 },
      ],
    },
    {
      name: "orderParam",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 270, b: 280 },
        { a: 367, b: 377 },
      ],
    },
    {
      name: "orderSort",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 295, b: 304 },
        { a: 392, b: 401 },
      ],
    },
    {
      name: "limit",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 451, b: 456 }],
    },
    {
      name: "offset",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 465, b: 471 }],
    },
  ],
  statement:
    'SELECT "students"."name", "students"."id_num", "batches"."name" as "batch"\nFROM "students"\nJOIN "batches" ON "batches"."id" = "students"."id"\nWHERE to_tsvector(\'english\', "students"."name") @@ to_tsquery(\'english\', :searchParam) or :searchParam = \'\'\nORDER BY (CASE WHEN :orderParam = \'name\' AND :orderSort = \'asc\' THEN "students"."name" END) ASC,\n         (CASE WHEN :orderParam = \'name\' AND :orderSort = \'desc\' THEN "students"."name" END) DESC\nLIMIT :limit\nOFFSET :offset',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT "students"."name", "students"."id_num", "batches"."name" as "batch"
 * FROM "students"
 * JOIN "batches" ON "batches"."id" = "students"."id"
 * WHERE to_tsvector('english', "students"."name") @@ to_tsquery('english', :searchParam) or :searchParam = ''
 * ORDER BY (CASE WHEN :orderParam = 'name' AND :orderSort = 'asc' THEN "students"."name" END) ASC,
 *          (CASE WHEN :orderParam = 'name' AND :orderSort = 'desc' THEN "students"."name" END) DESC
 * LIMIT :limit
 * OFFSET :offset
 * ```
 */
export const getAllStudents = new PreparedQuery<
  IGetAllStudentsParams,
  IGetAllStudentsResult
>(getAllStudentsIR);

/** 'GetAllStudentsCount' parameters type */
export interface IGetAllStudentsCountParams {
  searchParam?: string | null | void;
}

/** 'GetAllStudentsCount' return type */
export interface IGetAllStudentsCountResult {
  count: string | null;
}

/** 'GetAllStudentsCount' query type */
export interface IGetAllStudentsCountQuery {
  params: IGetAllStudentsCountParams;
  result: IGetAllStudentsCountResult;
}

const getAllStudentsCountIR: any = {
  usedParamSet: { searchParam: true },
  params: [
    {
      name: "searchParam",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 105, b: 116 },
        { a: 122, b: 133 },
      ],
    },
  ],
  statement:
    "SELECT COUNT(*)\nFROM \"students\"\nWHERE to_tsvector('english', \"students\".\"name\") @@ to_tsquery('english', :searchParam) or :searchParam = ''",
};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(*)
 * FROM "students"
 * WHERE to_tsvector('english', "students"."name") @@ to_tsquery('english', :searchParam) or :searchParam = ''
 * ```
 */
export const getAllStudentsCount = new PreparedQuery<
  IGetAllStudentsCountParams,
  IGetAllStudentsCountResult
>(getAllStudentsCountIR);

/** 'GetAllStaffs' parameters type */
export interface IGetAllStaffsParams {
  limit?: number | string | null | void;
  offset?: number | string | null | void;
  orderParam?: string | null | void;
  orderSort?: string | null | void;
  searchParam?: string | null | void;
}

/** 'GetAllStaffs' return type */
export interface IGetAllStaffsResult {
  id_num: string;
  name: string;
}

/** 'GetAllStaffs' query type */
export interface IGetAllStaffsQuery {
  params: IGetAllStaffsParams;
  result: IGetAllStaffsResult;
}

const getAllStaffsIR: any = {
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
        { a: 127, b: 138 },
        { a: 144, b: 155 },
      ],
    },
    {
      name: "orderParam",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 182, b: 192 },
        { a: 277, b: 287 },
      ],
    },
    {
      name: "orderSort",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 207, b: 216 },
        { a: 302, b: 311 },
      ],
    },
    {
      name: "limit",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 359, b: 364 }],
    },
    {
      name: "offset",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 373, b: 379 }],
    },
  ],
  statement:
    'SELECT "staffs"."name", "staffs"."id_num"\nFROM "staffs"\nWHERE to_tsvector(\'english\', "staffs"."name") @@ to_tsquery(\'english\', :searchParam) or :searchParam = \'\'\nORDER BY (CASE WHEN :orderParam = \'name\' AND :orderSort = \'asc\' THEN "staffs"."name" END) ASC,\n         (CASE WHEN :orderParam = \'name\' AND :orderSort = \'desc\' THEN "staffs"."name" END) DESC\nLIMIT :limit\nOFFSET :offset',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT "staffs"."name", "staffs"."id_num"
 * FROM "staffs"
 * WHERE to_tsvector('english', "staffs"."name") @@ to_tsquery('english', :searchParam) or :searchParam = ''
 * ORDER BY (CASE WHEN :orderParam = 'name' AND :orderSort = 'asc' THEN "staffs"."name" END) ASC,
 *          (CASE WHEN :orderParam = 'name' AND :orderSort = 'desc' THEN "staffs"."name" END) DESC
 * LIMIT :limit
 * OFFSET :offset
 * ```
 */
export const getAllStaffs = new PreparedQuery<
  IGetAllStaffsParams,
  IGetAllStaffsResult
>(getAllStaffsIR);

/** 'GetAllStaffsCount' parameters type */
export interface IGetAllStaffsCountParams {
  searchParam?: string | null | void;
}

/** 'GetAllStaffsCount' return type */
export interface IGetAllStaffsCountResult {
  count: string | null;
}

/** 'GetAllStaffsCount' query type */
export interface IGetAllStaffsCountQuery {
  params: IGetAllStaffsCountParams;
  result: IGetAllStaffsCountResult;
}

const getAllStaffsCountIR: any = {
  usedParamSet: { searchParam: true },
  params: [
    {
      name: "searchParam",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 101, b: 112 },
        { a: 118, b: 129 },
      ],
    },
  ],
  statement:
    "SELECT COUNT(*)\nFROM \"staffs\"\nWHERE to_tsvector('english', \"staffs\".\"name\") @@ to_tsquery('english', :searchParam) or :searchParam = ''",
};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(*)
 * FROM "staffs"
 * WHERE to_tsvector('english', "staffs"."name") @@ to_tsquery('english', :searchParam) or :searchParam = ''
 * ```
 */
export const getAllStaffsCount = new PreparedQuery<
  IGetAllStaffsCountParams,
  IGetAllStaffsCountResult
>(getAllStaffsCountIR);
