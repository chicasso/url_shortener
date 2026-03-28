import http from 'http';
import express from 'express';
import { MongoDB } from "../database/connect.ts";
import { getConfig } from "@url-shortener/config";
import { createLogger } from "../logger/logger.ts";
import { retry } from './retry.ts';

export class App {
  private server!: http.Server;
  private app: express.Application;
  private config: ReturnType<typeof getConfig>;
  private logger: ReturnType<typeof createLogger>;

  constructor(svcName: string) {
    this.app = express();
    this.config = getConfig();
    this.logger = createLogger(svcName);

    this.setupProcessHandlers();
  }

  getApp(): express.Application {
    return this.app;
  }

  startServer() {
    this.server = this.app.listen(this.config.port, () => {
      this.logger.info(`Server is running on port ${this.config.port}`);
    });

    this.server.on('error', (err) => {
      this.logger.fatal('Server failed to start: ' + err.message);
      process.exit(1);
    });    
  }

  setupProcessHandlers() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.on('SIGINT', async () => {
      this.logger.info('Received SIGINT. Shutting down gracefully...');
      await this.shutdown('SIGINT');
    });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    process.on('SIGTERM', async () => {
      this.logger.info('Received SIGTERM. Shutting down gracefully...');
      await this.shutdown('SIGTERM');
    });

    process.on('uncaughtException', (err) => {
      this.logger.fatal(`Uncaught Exception: ${err.message}`);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
      this.logger.fatal(`Unhandled Rejection: ${reason as string}`);
      process.exit(1);
    });
  }


  async connectDB() {
    await retry<void>(() => MongoDB.connect(this.config.mongoUri, {
      ...MongoDB.getDefaultConnectionOptions(),
    }), 5, 3000);

    this.logger.info('Connected to MongoDB');
  }

  public async init(): Promise<App> {
    try {
      await this.connectDB();
      this.startServer();
      return this;
    } catch (error) {
      this.logger.fatal(`App failed to start: ${(error as Error).message}`);
      process.exit(1);
    }
  }

  private async shutdown(signal: string): Promise<void> {
    this.logger.warn(`Received ${signal}. Shutting down...`);

    try {
      if (this.server) {
        await new Promise<void>((resolve, reject) => {
          this.server.close((err) => {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        });
        this.logger.info('HTTP server closed');
      }

      const conn = MongoDB.getInstance();
      if (conn) {
        await conn.close();
        this.logger.info('MongoDB connection closed');
      }

      process.exit(0);
    } catch (error) {
      this.logger.error(`Error during shutdown: ${(error as Error).message}`);
      process.exit(1);
    }
  }
}
