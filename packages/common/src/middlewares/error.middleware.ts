import { ParsedQs } from 'qs';
import { Response } from 'express';
import { NextFunction, ParamsDictionary } from 'express-serve-static-core';
import { IRequest } from "../types/api.ts";
import { defaultLogger as logger } from "../logger/logger.ts";

export function error(
  error: unknown,
  req: IRequest<ParamsDictionary, unknown, unknown, ParsedQs>,
  res: Response<unknown>,
  _next: NextFunction,
) {
  logger.error(error);
  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: 'Internal Server Error',
    data: {},
    error: {},
  });
}
