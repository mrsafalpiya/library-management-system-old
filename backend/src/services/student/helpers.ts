import { borrowDetailsInterface, outputBorrowType } from "./types";
import dayjs from "dayjs";

export interface borrowsQueryResult {
  register_id: string;
  title: string;
  author: string;
  publisher: string;
  issue_date: Date;
  issue_duration_days: number;
}

export function getBorrowsDetailFromQueryResult(
  queryResponse: borrowsQueryResult[]
): outputBorrowType {
  let outputBorrows: outputBorrowType = {
    borrows_count: 0,
    has_late_borrows: false,
    list: [],
  };

  outputBorrows.borrows_count = queryResponse.length;

  queryResponse.forEach((borrow) => {
    let newBorrow: borrowDetailsInterface = {
      register_id: borrow.register_id,
      title: borrow.title,
      author: borrow.author,
      publisher: borrow.publisher,
      issue_date: borrow.issue_date,
      due_date: dayjs(borrow.issue_date)
        .add(borrow.issue_duration_days, "days")
        .toDate(),
      issue_duration_days: borrow.issue_duration_days,
      is_late: false,
    };

    if (new Date() > newBorrow.due_date) {
      newBorrow.is_late = true;
      outputBorrows.has_late_borrows = true;
    }

    outputBorrows.list.push(newBorrow);
  });

  return outputBorrows;
}
