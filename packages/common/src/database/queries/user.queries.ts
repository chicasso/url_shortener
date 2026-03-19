import { HydratedDocument } from "mongoose";
import { MongoServerError } from "mongodb";
import { IUser, User } from "../models/user.model.ts";

export class UserQueries {
  static async createUser(email: string, password: string): Promise<{
    error: boolean, message: string, user: HydratedDocument<IUser> | null,
  }> {
    try {
      const user = await User.create({ email, password });
      return { error: false, message: "User created successfully", user };
    } catch (error) {
      console.error("Error creating user:", error);
      if (error instanceof MongoServerError) {
        if (error.code === 11000) {
          return { error: true, message: "User already exists", user: null };
        }
      }
      return { error: true, message: "An error occurred while creating the user", user: null };
    }
  }

  static async findUserByEmail(email: string): Promise<{
    error: boolean, message: string, user: HydratedDocument<IUser> | null
  }> {
    try {
      const user = await User.findOne({ email });
      return { error: false, message: "User found", user };
    } catch (error) {
      console.error("Error creating user:", error);
      return { error: true, message: "An error occurred while searching for the user", user: null };
    }
  }
}
