/** Types generated for queries found in "src/services/books/queries.sql" */
import { PreparedQuery } from "@pgtyped/runtime";

/** 'ListBooks' parameters type */
export interface IListBooksParams {
  limit?: number | string | null | void;
  offset?: number | string | null | void;
  orderParam?: string | null | void;
  orderSort?: string | null | void;
  searchParam?: string | null | void;
}

/** 'ListBooks' return type */
export interface IListBooksResult {
  author: string;
  id: string;
  publisher: string;
  title: string;
}

/** 'ListBooks' query type */
export interface IListBooksQuery {
  params: IListBooksParams;
  result: IListBooksResult;
}

const listBooksIR: any = {
  usedParamSet: {
    searchParam: true,
    orderParam: true,
    orderSort: true,
    limit: true,
    offset: true,
  },
  params: [
    {
      name: "searchParam",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 83, b: 94 },
        { a: 100, b: 111 },
      ],
    },
    {
      name: "orderParam",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 138, b: 148 },
        { a: 224, b: 234 },
        { a: 312, b: 322 },
        { a: 400, b: 410 },
        { a: 490, b: 500 },
        { a: 584, b: 594 },
      ],
    },
    {
      name: "orderSort",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 164, b: 173 },
        { a: 250, b: 259 },
        { a: 339, b: 348 },
        { a: 427, b: 436 },
        { a: 520, b: 529 },
        { a: 614, b: 623 },
      ],
    },
    {
      name: "limit",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 665, b: 670 }],
    },
    {
      name: "offset",
      required: false,
      transform: { type: "scalar" },
      locs: [{ a: 679, b: 685 }],
    },
  ],
  statement:
    "SELECT *\nFROM \"books\"\nWHERE to_tsvector('english', title) @@ to_tsquery('english', :searchParam) or :searchParam = ''\nORDER BY (CASE WHEN :orderParam = 'title' AND :orderSort = 'asc' THEN title END) ASC,\n         (CASE WHEN :orderParam = 'title' AND :orderSort = 'desc' THEN title END) DESC,\n         (CASE WHEN :orderParam = 'author' AND :orderSort = 'asc' THEN author END) ASC,\n         (CASE WHEN :orderParam = 'author' AND :orderSort = 'desc' THEN author END) DESC,\n         (CASE WHEN :orderParam = 'publisher' AND :orderSort = 'asc' THEN publisher END) ASC,\n         (CASE WHEN :orderParam = 'publisher' AND :orderSort = 'desc' THEN publisher END) DESC\nLIMIT :limit\nOFFSET :offset",
};

/**
 * Query generated from SQL:
 * ```
 * SELECT *
 * FROM "books"
 * WHERE to_tsvector('english', title) @@ to_tsquery('english', :searchParam) or :searchParam = ''
 * ORDER BY (CASE WHEN :orderParam = 'title' AND :orderSort = 'asc' THEN title END) ASC,
 *          (CASE WHEN :orderParam = 'title' AND :orderSort = 'desc' THEN title END) DESC,
 *          (CASE WHEN :orderParam = 'author' AND :orderSort = 'asc' THEN author END) ASC,
 *          (CASE WHEN :orderParam = 'author' AND :orderSort = 'desc' THEN author END) DESC,
 *          (CASE WHEN :orderParam = 'publisher' AND :orderSort = 'asc' THEN publisher END) ASC,
 *          (CASE WHEN :orderParam = 'publisher' AND :orderSort = 'desc' THEN publisher END) DESC
 * LIMIT :limit
 * OFFSET :offset
 * ```
 */
export const listBooks = new PreparedQuery<IListBooksParams, IListBooksResult>(
  listBooksIR
);

/** 'ListBooksCount' parameters type */
export interface IListBooksCountParams {
  searchParam?: string | null | void;
}

/** 'ListBooksCount' return type */
export interface IListBooksCountResult {
  count: string | null;
}

/** 'ListBooksCount' query type */
export interface IListBooksCountQuery {
  params: IListBooksCountParams;
  result: IListBooksCountResult;
}

const listBooksCountIR: any = {
  usedParamSet: { searchParam: true },
  params: [
    {
      name: "searchParam",
      required: false,
      transform: { type: "scalar" },
      locs: [
        { a: 88, b: 99 },
        { a: 105, b: 116 },
      ],
    },
  ],
  statement:
    "SELECT COUNT(*)\nFROM books\nWHERE to_tsvector('english', title) @@ to_tsquery('english', :searchParam) or :searchParam = ''",
};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(*)
 * FROM books
 * WHERE to_tsvector('english', title) @@ to_tsquery('english', :searchParam) or :searchParam = ''
 * ```
 */
export const listBooksCount = new PreparedQuery<
  IListBooksCountParams,
  IListBooksCountResult
>(listBooksCountIR);