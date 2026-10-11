import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Write the parsed/sanitized values back so unknown keys stripped by the
      // schema do NOT survive into controllers/Prisma (prevents over-posting /
      // mass assignment). Only reassign the parts the schema actually declared.
      const result = parsed as { body?: unknown; query?: unknown; params?: unknown };
      if (result.body !== undefined) req.body = result.body;
      if (result.query !== undefined) {
        // req.query has no setter on some Express versions — mutate in place.
        for (const key of Object.keys(req.query)) delete (req.query as Record<string, unknown>)[key];
        Object.assign(req.query, result.query);
      }
      if (result.params !== undefined) Object.assign(req.params, result.params);

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
