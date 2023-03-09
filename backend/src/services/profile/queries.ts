/** Types generated for queries found in "src/services/profile/queries.sql" */
import { PreparedQuery } from "@pgtyped/runtime";

/** 'GetStudentDetails' parameters type */
export interface IGetStudentDetailsParams {
  studentIDNum?: string | null | void;
}

/** 'GetStudentDetails' return type */
export interface IGetStudentDetailsResult {
  address: string;
  batch: string;
  contact: string;
  email: string;
  id: string;
  id_num: string;
  name: string;
}

/** 'GetStudentDetails' query type */
export interface IGetStudentDetailsQuery {
  params: IGetStudentDetailsParams;
  result: IGetStudentDetailsResult;
}

const getStudentDetailsIR: any = {
  usedParamSet: { studentIDNum: true },
  params: [
    {
      name: "studentIDNum",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 260, b: 272 }],
    },
  ],
  statement:
    'SELECT "students"."id", "students"."id_num", "students"."name", "students"."address", "students"."contact", "students"."email", "batches"."name" AS batch\nFROM "students"\nLEFT JOIN "batches" ON "batches"."id" = "students"."batch_id"\nWHERE "students"."id_num" = :studentIDNum',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT "students"."id", "students"."id_num", "students"."name", "students"."address", "students"."contact", "students"."email", "batches"."name" AS batch
 * FROM "students"
 * LEFT JOIN "batches" ON "batches"."id" = "students"."batch_id"
 * WHERE "students"."id_num" = :studentIDNum
 * ```
 */
export const getStudentDetails = new PreparedQuery<
  IGetStudentDetailsParams,
  IGetStudentDetailsResult
>(getStudentDetailsIR);
