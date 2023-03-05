/** Types generated for queries found in "src/services/auth/queries.sql" */
import { PreparedQuery } from "@pgtyped/runtime";

/** 'LoginStudent' parameters type */
export interface ILoginStudentParams {
  idNum?: string | null | void;
}

/** 'LoginStudent' return type */
export interface ILoginStudentResult {
  id: string;
  id_num: string;
  name: string;
  password_hashed: string;
}

/** 'LoginStudent' query type */
export interface ILoginStudentQuery {
  params: ILoginStudentParams;
  result: ILoginStudentResult;
}

const loginStudentIR: any = {
  usedParamSet: { idNum: true },
  params: [
    {
      name: "idNum",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 78, b: 83 }],
    },
  ],
  statement:
    'SELECT "id", "id_num", "name", "password_hashed"\nFROM "students" WHERE id_num=:idNum',
};

/**
 * Query generated from SQL:
 * ```
 * SELECT "id", "id_num", "name", "password_hashed"
 * FROM "students" WHERE id_num=:idNum
 * ```
 */
export const loginStudent = new PreparedQuery<
  ILoginStudentParams,
  ILoginStudentResult
>(loginStudentIR);
