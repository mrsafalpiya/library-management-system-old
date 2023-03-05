import { transformAndValidate } from "class-transformer-validator";
import { ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

function validateAndAddToReqBody<T>(
  c: T,
  whitelist = true,
  errorHandler?: (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => void
) {
  return function ExpressClassValidate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const toValidate = req.body;
    if (!toValidate) {
      if (errorHandler) {
        errorHandler({ type: "no-body" }, req, res, next);
      } else {
        res.status(400).json({
          error: "No request body found",
        });
      }
    } else {
      transformAndValidate(c as any, toValidate, { validator: { whitelist } })
        .then((transformed) => {
          req.body = transformed;
          next();
        })
        .catch((err: ValidationError[]) => {
          if (errorHandler) {
            errorHandler(err, req, res, next);
          } else {
            let errors: {
              field_name: string;
              messages: string[];
            }[] = [];

            for (const e of err) {
              let messages: string[] = [];

              for (const key in e.constraints) {
                let m = e.constraints[key];
                messages.push(m.split(" ").slice(1).join(" "));
              }

              errors.push({
                field_name: e.property,
                messages: messages,
              });
            }
            res.status(400).json({
              errors: errors,
            });
          }
        });
    }
  };
}

export { validateAndAddToReqBody as makeValidateBody };
