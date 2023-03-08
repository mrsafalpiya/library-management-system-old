import { IGetStudentDashboardBorrowsResult } from "./queries";

export interface borrowDetailsInterface
  extends IGetStudentDashboardBorrowsResult {
  due_date: Date;
  is_late: boolean;
}

export type outputBorrowType = {
  borrows_count: number;
  has_late_borrows: boolean;
  list: borrowDetailsInterface[];
};
