import { ServerConfig } from "app";
import { Response, RequestHandler, Request } from "express";
import {
  responseBadRequest,
  responseOK,
  responseServerError,
} from "server/json";
import { getSortQuery } from "server/utils";
import { IListBooksResult, listBooks, listBooksCount } from "./queries";

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

    let paginationTotalRecords: number;
    let paginationLastPage: number;

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
      paginationTotalRecords = parseInt(queryResult[0].count);
      paginationLastPage = Math.ceil(paginationTotalRecords / querySize);
    } catch (e) {
      responseServerError(res, e);
      return;
    }

    responseOK(res, {
      metadata: {
        current_page: queryPage,
        page_size: querySize,
        first_page: 1,
        last_page: paginationLastPage,
        total_records: paginationTotalRecords,
        page_records_count: books.length,
      },
      books: books,
    });
  };
}
