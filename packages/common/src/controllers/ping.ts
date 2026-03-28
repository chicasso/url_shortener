import { ParsedQs } from 'qs';
import { Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { IRequest } from "../types/api.ts";

export function ping(
  req: IRequest<ParamsDictionary, unknown, unknown, ParsedQs>,
  res: Response<unknown>,
) {
  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'pong',
    data: {},
    error: {},
  });
}
