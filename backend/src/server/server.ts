import express, { NextFunction, Request, Response } from "express";
import { Express } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

interface ExpressError extends Error {
  statusCode?: number;
}

export function getServer(): Express {
  const expressInstance = express();

  expressInstance.use(bodyParser.json());
  expressInstance.use(cookieParser());
  expressInstance.use(morgan("dev"));

  expressInstance.use(
    (err: ExpressError, _req: Request, res: Response, _next: NextFunction) => {
      const { statusCode, message } = err;
      if (statusCode && statusCode >= 400 && statusCode < 500) {
        res.status(statusCode).json({
          error: message,
        });
      } else {
        console.error("Unhandled error", {
          statusCode,
          message,
          stack: err.stack,
        });
        res.status(500).send({ error: "Internal server error" });
      }
    }
  );

  return expressInstance;
}
