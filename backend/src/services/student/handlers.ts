import { ServerConfig } from "app";
import { Response, RequestHandler } from "express";
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
  IGetStudentTransactionsResult,
  getStudentTransactionsCount,
  getStudentProfile,
  updateStudentProfileDetails,
  getStudentPasswordHashed,
  updateStudentPassword,
} from "./queries";
import { PasswordRequest, UpdateRequest } from "./routes";
import * as bcrypt from "bcrypt";
import { outputBorrowType } from "./types";
import { getBorrowsDetailFromQueryResult } from "./helpers";

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

      outputBorrows = getBorrowsDetailFromQueryResult(queryResponse);
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

export function handleGetProfile(serverCfg: ServerConfig): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    try {
      const queryResponse = await getStudentProfile.run(
        { studentID: req.user?.user_id },
        serverCfg.dbConn
      );
      responseOK(res, queryResponse[0]);
      return;
    } catch (e) {
      responseServerError(res, e);
      return;
    }
  };
}

export function handleUpdateProfileDetails(
  serverCfg: ServerConfig
): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    let requestBody = req.body as UpdateRequest;

    try {
      await updateStudentProfileDetails.run(
        {
          studentID: req.user?.user_id,
          address: requestBody.address,
          contact: requestBody.contact,
          email: requestBody.email,
        },
        serverCfg.dbConn
      );
      responseOK(res, { response: "ok" });
    } catch (e) {
      responseServerError(res, e);
      return;
    }
  };
}

export function handleUpdatePassword(serverCfg: ServerConfig): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    let requestBody = req.body as PasswordRequest;

    // Get old password hashed.

    let oldPasswordHashed = "";
    try {
      const queryResponse = await getStudentPasswordHashed.run(
        { studentID: req.user?.user_id },
        serverCfg.dbConn
      );

      oldPasswordHashed = queryResponse[0].password_hashed;
    } catch (e) {
      responseServerError(res, e);
      return;
    }

    // Check if the old password matches.

    const oldPasswordIsValid = await bcrypt.compare(
      requestBody.old_password,
      oldPasswordHashed
    );
    if (!oldPasswordIsValid) {
      responseBadRequest(res, "old password is incorrect");
      return;
    }

    // Hash new password and replace the old password.

    let newPasswordHashed = await bcrypt.hash(requestBody.new_password, 12);

    try {
      await updateStudentPassword.run(
        {
          passwordHashed: newPasswordHashed,
          studentID: req.user?.user_id,
        },
        serverCfg.dbConn
      );
      responseOK(res, { response: "ok" });
    } catch (e) {
      responseServerError(res, e);
      return;
    }
  };
}
