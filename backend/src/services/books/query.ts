/** Types generated for queries found in "src/services/books/query.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetAllBooks' parameters type */
export type IGetAllBooksParams = void;

/** 'GetAllBooks' return type */
export interface IGetAllBooksResult {
  author: string | null;
  code: string;
  id: string;
  publisher: string | null;
  title: string;
}

/** 'GetAllBooks' query type */
export interface IGetAllBooksQuery {
  params: IGetAllBooksParams;
  result: IGetAllBooksResult;
}

const getAllBooksIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT * FROM books"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM books
 * ```
 */
export const getAllBooks = new PreparedQuery<IGetAllBooksParams,IGetAllBooksResult>(getAllBooksIR);


