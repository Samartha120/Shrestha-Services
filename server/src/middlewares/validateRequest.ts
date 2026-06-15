import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: any) {
      res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Validation failed on input constraints",
        errors: err.errors,
      });
    }
  };
};
