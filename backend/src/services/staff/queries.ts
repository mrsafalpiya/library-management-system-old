/** Types generated for queries found in "src/services/staff/queries.sql" */
import { PreparedQuery } from "@pgtyped/runtime";

/** 'GetStaffDashboardProfile' parameters type */
export interface IGetStaffDashboardProfileParams {
  staffID?: number | string | null | void;
}

/** 'GetStaffDashboardProfile' return type */
export interface IGetStaffDashboardProfileResult {
  id_num: string;
  name: string;
}

/** 'GetStaffDashboardProfile' query type */
export interface IGetStaffDashboardProfileQuery {
  params: IGetStaffDashboardProfileParams;
  result: IGetStaffDashboardProfileResult;
}

const getStaffDashboardProfileIR: any = {
  usedParamSet: { staffID: true },
  params: [
    {
      name: "staffID",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 78, b: 85 }],
    },
  ],
  statement:
    'SELECT "staffs"."name", "staffs"."id_num"\nFROM "staffs"\nWHERE "staffs"."id" = :staffID',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT "staffs"."name", "staffs"."id_num"
 * FROM "staffs"
 * WHERE "staffs"."id" = :staffID
 * ```
 */
export const getStaffDashboardProfile = new PreparedQuery<
  IGetStaffDashboardProfileParams,
  IGetStaffDashboardProfileResult
>(getStaffDashboardProfileIR);

/** 'GetStaffDashboardStats' parameters type */
export type IGetStaffDashboardStatsParams = void;

/** 'GetStaffDashboardStats' return type */
export interface IGetStaffDashboardStatsResult {
  books_count: string | null;
  copies_count: string | null;
  reservations_count: string | null;
  staffs_count: string | null;
  students_count: string | null;
}

/** 'GetStaffDashboardStats' query type */
export interface IGetStaffDashboardStatsQuery {
  params: IGetStaffDashboardStatsParams;
  result: IGetStaffDashboardStatsResult;
}

const getStaffDashboardStatsIR: any = {
  usedParamSet: {},
  params: [],
  statement:
    'SELECT\n\t(SELECT count(*) AS books_count FROM "books"),\n\t(SELECT count(*) AS copies_count FROM "copies"),\n\t(SELECT count(*) AS students_count FROM "students"),\n\t(SELECT count(*) AS staffs_count FROM "staffs"),\n\t(SELECT count(*) AS reservations_count FROM "reservations")',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 * 	(SELECT count(*) AS books_count FROM "books"),
 * 	(SELECT count(*) AS copies_count FROM "copies"),
 * 	(SELECT count(*) AS students_count FROM "students"),
 * 	(SELECT count(*) AS staffs_count FROM "staffs"),
 * 	(SELECT count(*) AS reservations_count FROM "reservations")
 * ```
 */
export const getStaffDashboardStats = new PreparedQuery<
  IGetStaffDashboardStatsParams,
  IGetStaffDashboardStatsResult
>(getStaffDashboardStatsIR);
