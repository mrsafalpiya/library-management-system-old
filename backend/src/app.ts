import server from "./server/server";
import dotenv from "dotenv";
import { Request, Response } from "express";
import {setupAndGetDBConn} from "./db/connection";
import {exit} from "process";
import {getAllBooks} from "./services/books/query";

// dotenv
dotenv.config({
  path: ".envrc",
});

// Server
const port = process.env.APP_PORT || 5000;

// Database
const dbHost = process.env.PGHOST || "localhost";
const dbPort = Number(process.env.PGPORT) || 5432;
const dbDatabase = process.env.PGDATABASE || "postgres";
const dbUser = process.env.PGUSER || "root";
const dbPassword = process.env.PGPASSWORD || "root";

async function main() {
  const dbConn = await setupAndGetDBConn(dbHost, dbPort, dbDatabase, dbUser, dbPassword).catch((error) => {
    console.log(error.message)
    exit(1)
  });

  server.get("/", async (req: Request, res: Response) => {
    const books = await getAllBooks.run(undefined, dbConn);
    res.send(books);
  });

  server.listen(port, () => {
    console.log("Starting the server...");
  });
}

main();
