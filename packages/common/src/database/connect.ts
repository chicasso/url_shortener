import mongoose from 'mongoose';

export default class MongoDB {
  private static instance: mongoose.Connection;
  
  public static getInstance(): mongoose.Connection {
    if (!MongoDB.instance && mongoose.connection.readyState === mongoose.ConnectionStates.connected) {
      MongoDB.instance = mongoose.connection;
    }
    return MongoDB.instance;
  }

  public static async connect(uri: string, options?: mongoose.ConnectOptions): Promise<void> {
    if (mongoose.connection.readyState !== mongoose.ConnectionStates.connected) {
      try {
        await mongoose.connect(uri, options);
        MongoDB.instance = mongoose.connection;
      } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      }
    }
  }
}
