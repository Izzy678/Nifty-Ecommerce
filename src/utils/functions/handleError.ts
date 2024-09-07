import { NextFunction } from "express";
import HttpException from "../exceptions/http.exception";

export function handleError(error: any, next: NextFunction): void {
  if (error instanceof HttpException) {
    next(error);
  } else {
    next(new HttpException(500, "An unexpected error occurred"));
  }
}
