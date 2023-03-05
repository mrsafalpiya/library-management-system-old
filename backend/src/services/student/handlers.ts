import { ServerConfig } from "app";
import { Response, RequestHandler, query } from "express";
import {
  responseBadRequest,
  responseOK,
  responseServerError,
} from "server/json";
import { PaginationMetadata } from "server/pagination";
import { AuthorizedRequest } from "services/users/types";
import {
  getStudentDashboardBorrows,
  getStudentDashboardProfile,
  getStudentDashboardTransactions,
  getStudentTransactions,
  IGetStudentDashboardBorrowsResult,
  IGetStudentTransactionsResult,
  getStudentTransactionsCount,
} from "./queries";

export function handleDashboard(serverCfg: ServerConfig): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    // Query about the user

    type outputUserType = {
      name: string;
      id_num: string;
      id_type: string;
      batch: string;
    };
    let outputUser: outputUserType = {
      name: "",
      id_num: "",
      id_type: "student",
      batch: "",
    };

    try {
      const queryResponse = await getStudentDashboardProfile.run(
        { studentID: req.user?.user_id },
        serverCfg.dbConn
      );
      if (queryResponse.length == 0) {
        responseBadRequest(res, "student does not exist");
        return;
      }

      outputUser.name = queryResponse[0].name;
      outputUser.id_num = queryResponse[0].id_num;
      outputUser.batch = queryResponse[0].batch;
    } catch (e) {
      responseServerError(res, e);
      return;
    }

    // Query about the transactions

    type outputTransactionsType = {
      type: string;
      book_name: string;
      date_time: Date;
    };
    let outputTransactions: outputTransactionsType[] = [];

    try {
      const queryResponse = await getStudentDashboardTransactions.run(
        { studentID: req.user?.user_id },
        serverCfg.dbConn
      );
      if (queryResponse.length == 0) {
        responseBadRequest(res, "student does not exist");
        return;
      }

      queryResponse.forEach((transaction) => {
        let newTransaction = <outputTransactionsType>{};

        newTransaction.type = transaction.transaction_type;
        newTransaction.book_name = transaction.title;
        newTransaction.date_time = transaction.created_at;

        outputTransactions.push(newTransaction);
      });
    } catch (e) {
      responseServerError(res, e);
      return;
    }

    // Query about the borrows

    interface borrowDetailsInterface extends IGetStudentDashboardBorrowsResult {
      due_date: Date;
      is_late: boolean;
    }

    type outputBorrowType = {
      borrows_count: number;
      has_late_borrows: boolean;
      list: borrowDetailsInterface[];
    };
    let outputBorrows: outputBorrowType = {
      borrows_count: 0,
      has_late_borrows: false,
      list: [],
    };

    try {
      const queryResponse = await getStudentDashboardBorrows.run(
        { studentID: req.user?.user_id },
        serverCfg.dbConn
      );
      if (queryResponse.length == 0) {
        responseBadRequest(res, "student does not exist");
        return;
      }

      outputBorrows.borrows_count = queryResponse.length;

      queryResponse.forEach((borrow) => {
        let newBorrow = <borrowDetailsInterface>{};

        newBorrow.register_id = borrow.register_id;
        newBorrow.title = borrow.title;
        newBorrow.author = borrow.author;
        newBorrow.publisher = borrow.publisher;
        newBorrow.issue_date = borrow.issue_date;
        newBorrow.due_date = new Date(
          newBorrow.issue_date.setMonth(newBorrow.issue_date.getMonth() + 12)
        );
        if (new Date() > newBorrow.due_date) {
          newBorrow.is_late = true;
          outputBorrows.has_late_borrows = true;
        }

        outputBorrows.list.push(newBorrow);
      });
    } catch (e) {
      responseServerError(res, e);
      return;
    }

    responseOK(res, {
      user: outputUser,
      transactions: outputTransactions,
      borrows: outputBorrows,
    });
  };
}

export function handleListTransactions(
  serverCfg: ServerConfig
): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    const queryType = (req.query.type as string) || ".*";
    const querySize = parseInt(req.query.size as string) || 5;
    const queryPage = parseInt(req.query.page as string) || 1;

    let outputTransactions: IGetStudentTransactionsResult[] = [];

    try {
      const queryResponse = await getStudentTransactions.run(
        {
          studentID: req.user?.user_id,
          transactionType: queryType,
          limit: querySize,
          offset: (queryPage - 1) * querySize,
        },
        serverCfg.dbConn
      );

      outputTransactions = queryResponse;
    } catch (e) {
      responseServerError(res, e);
    }

    // Query for pagination metadata

    let paginationMetadata: PaginationMetadata = {
      current_page: queryPage,
      first_page: 1,
      last_page: 0,
      page_records_count: 0,
      page_size: querySize,
      total_records: 0,
    };

    try {
      const queryResult = await getStudentTransactionsCount.run(
        { studentID: req.user?.user_id, transactionType: queryType },
        serverCfg.dbConn
      );
      if (queryResult[0].count == null) {
        responseServerError(
          res,
          "somehow pagination count query response is null"
        );
        return;
      }
      paginationMetadata.page_records_count = outputTransactions.length;
      paginationMetadata.total_records = parseInt(queryResult[0].count);
      paginationMetadata.last_page = Math.ceil(
        paginationMetadata.total_records / querySize
      );
    } catch (e) {
      responseServerError(res, e);
      return;
    }

    responseOK(res, {
      metadata: paginationMetadata,
      transactions: outputTransactions,
    });
  };
}
