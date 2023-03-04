import { getServer } from "./server/server";
import dotenv from "dotenv";
import { Express, Router } from "express";
import { setupAndGetDBConn } from "./db/connection";
import { exit } from "process";

import AuthService from "./services/auth";
import {Client} from "pg";

// dotenv
dotenv.config({
  path: ".envrc",
});

// Server
const port = process.env.APP_PORT || 5050;

// Database
const dbHost = process.env.PGHOST || "localhost";
const dbPort = Number(process.env.PGPORT) || 5432;
const dbDatabase = process.env.PGDATABASE || "postgres";
const dbUser = process.env.PGUSER || "root";
const dbPassword = process.env.PGPASSWORD || "root";
const jwtSecretKey = process.env.JWTSECRET || "secret";

export type ServerConfig = {
  expressInstance: Express;
  dbConn: Client;
  jwtSecretKey: string;
};


function registerRoutes(expressInstance: Express, serverCfg: ServerConfig) {
  const routes = Router();

  AuthService.registerRoutes(routes, serverCfg);

  expressInstance.use("/api/v1", routes);
}

async function main() {
  const dbConn = await setupAndGetDBConn(
    dbHost,
    dbPort,
    dbDatabase,
    dbUser,
    dbPassword
  ).catch((err: Error) => {
    console.log("[ERROR]", err.message);
    exit(1);
  });

  const expressInstance = getServer();

  let serverConfig: ServerConfig = {
    expressInstance,
    dbConn,
    jwtSecretKey
  }
  serverConfig.jwtSecretKey = jwtSecretKey;

  registerRoutes(serverConfig.expressInstance, serverConfig);

  serverConfig.expressInstance.listen(port, () => {
    console.log("Listening to port", port);
  });
}

main();
