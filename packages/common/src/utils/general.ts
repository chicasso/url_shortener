import { Response } from "@url-shortener/common";
import { getConfig } from "@url-shortener/config";
import { Environment } from "../types/general.ts";

export function isDev(): boolean {
  const env = getConfig().env as Environment;
  return env === Environment.Development;
}

export function isProd(): boolean {
  const env = getConfig().env as Environment;
  return env === Environment.Production;
}

export function responseFmt(result: Response<unknown>): Response<unknown> {
  result.statusCode ??= 200;

  const response: Response<unknown> = {
    data: result.data || {},
    message: result.message || '',
    success:
      result.statusCode >= 200 
      && result.statusCode < 300,
    statusCode: result.statusCode,
  };

  if (response.success) {
    return response;
  }

  response.error = { message: response.message || 'Unknown error' };

  switch (response.statusCode) {
    case 400:
      response.error.code = 'BAD_REQUEST';
      break;
    case 401:
      response.error.code = 'UNAUTHORIZED';
      break;
    case 404:
      response.error.code = 'NOT_FOUND';
      break;
    case 500:
      response.error.code = 'INTERNAL_SERVER_ERROR';
      break;
    default:
      response.error.code = 'UNKNOWN_ERROR';
      break;
  }
  return response;
}
