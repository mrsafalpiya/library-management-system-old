import { ServerConfig } from "app";
import { Response, RequestHandler, Request } from "express";
import { DatabaseError } from "pg";
import {
  responseBadRequest,
  responseOK,
  responseServerError,
} from "server/json";
import { PaginationMetadata } from "server/pagination";
import { getSortQuery } from "server/utils";
import {
  getCopy,
  IListBooksResult,
  listBooks,
  listBooksCount,
} from "./queries";

export function handleListBooks(serverCfg: ServerConfig): RequestHandler {
  return async function (req: Request, res: Response) {
    const querySize = parseInt(req.query.size as string) || 10;
    const queryPage = parseInt(req.query.page as string) || 1;
    const querySort = (req.query.sort as string) || "title-asc";
    const querySearch = (req.query.search as string) || "";

    // Check if the search query is valid, also parse it for query
    let orderParam, orderSort;
    try {
      [orderParam, orderSort] = getSortQuery(querySort, [
        "title",
        "author",
        "publisher",
      ]);
    } catch (e) {
      const err = e as Error;
      responseBadRequest(res, err.message);
      return;
    }

    // Query books

    let books: IListBooksResult[];

    try {
      books = await listBooks.run(
        {
          searchParam: querySearch,
          orderParam: orderParam,
          orderSort: orderSort,
          limit: querySize,
          offset: (queryPage - 1) * querySize,
        },
        serverCfg.dbConn
      );
    } catch (e) {
      responseServerError(res, e);
      return;
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
      const queryResult = await listBooksCount.run(
        { searchParam: querySearch },
        serverCfg.dbConn
      );
      if (queryResult[0].count == null) {
        responseServerError(
          res,
          "somehow pagination count query response is null"
        );
        return;
      }
      paginationMetadata.page_records_count = books.length;
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
      books: books,
    });
  };
}

export function handleGetCopy(serverCfg: ServerConfig): RequestHandler {
  return async function (req: Request, res: Response) {
    const registerID = req.params.registerID;

    try {
      const queryResponse = await getCopy.run({ registerID }, serverCfg.dbConn);

      if (queryResponse.length == 0) {
        responseBadRequest(res, "given registration ID does not exist");
        return;
      }

      responseOK(res, { book: queryResponse[0] });
      return;
    } catch (e) {
      responseServerError(res, e);
      return;
    }
  };
}

// TODO: Somehow avoid raw SQL.
export function handleIssueCopy(serverCfg: ServerConfig): RequestHandler {
  return async function (req: Request, res: Response) {
    try {
      await serverCfg.dbConn.query("BEGIN");
      await serverCfg.dbConn.query(
        `INSERT INTO "borrows" ("copy_id", "student_id", "duration_days") VALUES ($1, $2, $3);`,
        [req.body.copy_id, req.body.student_id, req.body.issue_duration_days]
      );
      await serverCfg.dbConn.query(
        `INSERT INTO "transactions" ("transaction_type", "copy_id", "student_id") VALUES ('borrow', $1, $2);`,
        [req.body.copy_id, req.body.student_id]
      );
      await serverCfg.dbConn.query("COMMIT");
      responseOK(res, { response: "ok" });
      return;
    } catch (e) {
      await serverCfg.dbConn.query("ROLLBACK;");

      const error = e as DatabaseError;

      switch (error.code) {
        case "23505":
          responseBadRequest(res, "the student has already borrowed this book");
          break;
        default:
          responseServerError(res, e);
      }
      return;
    }
  };
}
