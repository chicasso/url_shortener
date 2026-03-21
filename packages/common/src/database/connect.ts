import mongoose from 'mongoose';
import { MongoServerError } from 'mongodb';
import logger from '@url-shortener/logger';

export default class MongoDB {
  private static instance: mongoose.Connection;
  
  public static getInstance(): mongoose.Connection {
    if (!MongoDB.instance && mongoose.connection.readyState === mongoose.ConnectionStates.connected) {
      MongoDB.instance = mongoose.connection;
    }
    return MongoDB.instance;
  }

  public static async connect(uri?: string, options?: mongoose.ConnectOptions): Promise<void> {
    if (mongoose.connection.readyState !== mongoose.ConnectionStates.connected) {
      try {
        await mongoose.connect(uri as string, options);
        MongoDB.instance = mongoose.connection;
      } catch (error) {
        logger.error(`Error connecting to MongoDB: ${(error as MongoServerError).message}`);
        throw error;
      }
    }
  }

  public static getDefaultConnectionOptions(): mongoose.ConnectOptions {
    return {
      minPoolSize: 0,
      maxPoolSize: 10,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
    } as mongoose.ConnectOptions;
  }
}
