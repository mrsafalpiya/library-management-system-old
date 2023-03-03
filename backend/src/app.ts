import server from "./server/server";
import dotenv from "dotenv";
import { Request, Response } from "express";

const port = process.env.APP_PORT || 5000;

dotenv.config({
  path: ".envrc",
});

async function main() {
  server.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
  });

  server.listen(port, () => {
    console.log("Starting the server...");
  });
}

main();
