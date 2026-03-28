import { ParsedQs } from 'qs';
import { Response } from 'express';
import { NextFunction, ParamsDictionary } from 'express-serve-static-core';
import { IRequest } from "../types/api.js";

export function notFound(
  req: IRequest<ParamsDictionary, unknown, unknown, ParsedQs>,
  res: Response<unknown>,
  _next: NextFunction,
) {
  return res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Route not found',
    data: {},
    error: {},
  });
}
