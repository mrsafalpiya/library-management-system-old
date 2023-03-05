import { Request } from "express";

export const possibleIDTypes = ["student", "teacher", "staff"] as const;
export type IDType = (typeof possibleIDTypes)[number];

export interface AuthorizedRequest extends Request {
  user?: {
    user_id?: string;
    id_type?: string;
  };
}
