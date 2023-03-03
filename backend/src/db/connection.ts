import { Client } from "pg";

export async function setupAndGetDBConn(
  host: string,
  port: number,
  database: string,
  user: string,
  password: string
) {
  const dbConn = new Client({
    host: host,
    port: port,
    database: database,
    user: user,
    password: password,
  });
  dbConn.connect((err) => {
    if (err) {
      throw Error(err.message)
    }
  });
  return dbConn
}
