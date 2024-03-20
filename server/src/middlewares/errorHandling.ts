import { NextFunction } from "express";

export function errMiddleware(
  req: Request,
  res: Response,
  err: Error,
  next: NextFunction
) {
  if (err) {
    console.log("error occurred ! ", err.stack);
  } else {
    next();
  }
}
