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
