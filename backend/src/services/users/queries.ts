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
      locs: [{ a: 55, b: 64 }],
    },
  ],
  statement:
    "SELECT students.name\nFROM students\nWHERE students.id = :studentID",
};

/**
 * Query generated from SQL:
 * ```
 * SELECT students.name
 * FROM students
 * WHERE students.id = :studentID
 * ```
 */
export const getStudentName = new PreparedQuery<
  IGetStudentNameParams,
  IGetStudentNameResult
>(getStudentNameIR);
