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
  await dbConn.connect().catch((err: Error) => {
    throw err;
  });
  return dbConn;
}
