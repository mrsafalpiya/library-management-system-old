import { ServerConfig } from "app";
import { Request, Response, RequestHandler } from "express";
import {
  responseBadRequest,
  responseOK,
  responseServerError,
  responseUnauthorized,
} from "server/json";
import { PaginationMetadata } from "server/pagination";
import { getSortQuery } from "server/utils";
import { getBorrowsDetailFromQueryResult } from "services/student/helpers";
import { AuthorizedRequest } from "services/users/types";
import {
  getAllStaffs,
  getAllStaffsCount,
  getAllStudents,
  getAllStudentsCount,
  getStaffName,
  getStudentInfo,
  getStudentBorrows,
  getStudentName,
  IGetAllStaffsResult,
  IGetAllStudentsResult,
} from "./queries";

export function handleCheckIfUserIsValid(
  serverCfg: ServerConfig
): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    let name = "";

    switch (req.user?.id_type) {
      case "student":
        try {
          const queryResponse = await getStudentName.run(
            { studentID: req.user.user_id },
            serverCfg.dbConn
          );
          if (queryResponse.length == 0) {
            responseUnauthorized(res, "user does not exist");
            return;
          }

          name = queryResponse[0].name;
        } catch (e) {
          responseServerError(res, e);
          return;
        }
        break;
      case "staff":
        try {
          const queryResponse = await getStaffName.run(
            { staffID: req.user.user_id },
            serverCfg.dbConn
          );
          if (queryResponse.length == 0) {
            responseUnauthorized(res, "user does not exist");
            return;
          }

          name = queryResponse[0].name;
        } catch (e) {
          responseServerError(res, e);
          return;
        }
        break;
      case "teacher":
      // TODO: Implement in backend first.
    }

    responseOK(res, { name, id_type: req.user?.id_type });
  };
}

export function handleGetAllStudents(serverCfg: ServerConfig): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    const querySize = parseInt(req.query.size as string) || 10;
    const queryPage = parseInt(req.query.page as string) || 1;
    const querySort = (req.query.sort as string) || "title-asc";
    const querySearch = (req.query.search as string) || "";

    // Check if the search query is valid, also parse it for query
    let orderParam, orderSort;
    try {
      [orderParam, orderSort] = getSortQuery(querySort, ["name"]);
    } catch (e) {
      const err = e as Error;
      responseBadRequest(res, err.message);
      return;
    }

    // Query students

    let students: IGetAllStudentsResult[];

    try {
      students = await getAllStudents.run(
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
      const queryResult = await getAllStudentsCount.run(
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
      paginationMetadata.page_records_count = students.length;
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
      members: students,
    });
  };
}

export function handleGetAllStaffs(serverCfg: ServerConfig): RequestHandler {
  return async function (req: AuthorizedRequest, res: Response) {
    const querySize = parseInt(req.query.size as string) || 10;
    const queryPage = parseInt(req.query.page as string) || 1;
    const querySort = (req.query.sort as string) || "title-asc";
    const querySearch = (req.query.search as string) || "";

    // Check if the search query is valid, also parse it for query
    let orderParam, orderSort;
    try {
      [orderParam, orderSort] = getSortQuery(querySort, ["name"]);
    } catch (e) {
      const err = e as Error;
      responseBadRequest(res, err.message);
      return;
    }

    // Query staffs

    let staffs: IGetAllStaffsResult[];

    try {
      staffs = await getAllStaffs.run(
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
      const queryResult = await getAllStaffsCount.run(
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
      paginationMetadata.page_records_count = staffs.length;
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
      members: staffs,
    });
  };
}

export function handleGetStudentInfo(serverCfg: ServerConfig): RequestHandler {
  return async function (req: Request, res: Response) {
    const studentIDNum = req.params.studentIDNum;

    try {
      const studentInfoQueryResult = await getStudentInfo.run(
        { studentIDNum },
        serverCfg.dbConn
      );

      if (studentInfoQueryResult.length == 0) {
        responseBadRequest(res, "student with given ID number does not exist");

        return;
      }

      const studentBorrowsQueryResult = await getStudentBorrows.run(
        { studentIDNum },
        serverCfg.dbConn
      );

      const outputBorrows = getBorrowsDetailFromQueryResult(
        studentBorrowsQueryResult
      );

      responseOK(res, {
        user: studentInfoQueryResult[0],
        borrows: outputBorrows,
      });
      return;
    } catch (e) {
      responseServerError(res, e);
      return;
    }
  };
}
