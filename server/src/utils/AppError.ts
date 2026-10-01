/**
 * Operational error with an explicit HTTP status code.
 *
 * Throwing a plain `new Error()` makes the global error handler fall back to
 * HTTP 500. Use AppError whenever the failure is an expected, client-facing
 * condition (bad credentials, forbidden, not found, conflict) so the correct
 * status reaches the browser.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export const badRequest = (msg: string) => new AppError(msg, 400);
export const unauthorized = (msg: string) => new AppError(msg, 401);
export const forbidden = (msg: string) => new AppError(msg, 403);
export const notFound = (msg: string) => new AppError(msg, 404);
export const conflict = (msg: string) => new AppError(msg, 409);
