
import pino, { LoggerOptions } from 'pino';
import { isProd } from '@url-shortener/common';
import { getConfig } from '@url-shortener/config';

const { env, logLevel } = getConfig();

const options: LoggerOptions = {
  base: { env },
  level: logLevel || (isProd() ? 'info' : 'debug'),
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  serializers: {
    err: pino.stdSerializers.err,
  },
  depthLimit: 5,
  timestamp: true,
  // messageKey: 'message',
  // msgPrefix: `[${serviceName}] `,
};

const transport = !isProd()
  ? {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    }
  : {};

export function createLogger(serviceName: string) {
  return pino(
    {
      ...options,
      ...transport,
    },
    pino.destination(1)
  ).child({ service: serviceName });
}

export const defaultLogger = createLogger('default');
