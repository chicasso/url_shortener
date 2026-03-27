import { MongoServerError } from "mongodb";
import { Projection } from "../../types/mongodb.ts";
import { User, UserModel } from "../models/user.model.ts";
import { defaultLogger as logger } from "../../logger/logger.ts";
import { SuccessMessages, ErrorMessages } from "../../constants/messages.ts";

export class UserQueries {
  static async createUser(email: string, password?: string): Promise<{
    error: boolean, message: string, user: User | null,
  }> {
    try {
      const user = await UserModel.create({ email, password });
      return { error: false, message: SuccessMessages.USER_CREATED, user };
    } catch (error) {
      logger.error(`Error creating user: ${(error as Error).message}`);
      if (error instanceof MongoServerError) {
        if (error.code === 11000) {
          return { error: true, message: ErrorMessages.USER_ALREADY_EXISTS, user: null };
        }
      }
      return { error: true, message: ErrorMessages.USER_CREATION_FAILED, user: null };
    }
  }

  static async findUserByEmail(email: string, projection?: Projection<User>): Promise<{
    error: boolean, message: string, user: User | null,
  }> {
    try {
      const user = await UserModel.findOne({ email })
        .select(projection || { password: 0 })
        .lean();
      return { error: false, message: SuccessMessages.USER_FOUND, user };
    } catch (error) {
      logger.error(`Error searching for user: ${(error as Error).message}`);
      return { error: true, message: ErrorMessages.USER_SEARCH_FAILED, user: null };
    }
  }

  static async findUserById(id: string, projection?: Projection<User>): Promise<{
    error: boolean, message: string, user: User | null,
  }> {
    try {
      const user = await UserModel.findById(id)
        .select(projection || { password: 0 })
        .lean();
      return { error: false, message: SuccessMessages.USER_FOUND, user };
    } catch (error) {
      logger.error(`Error finding user by ID: ${(error as Error).message}`);
      return { error: true, message: ErrorMessages.USER_SEARCH_FAILED, user: null };
    }
  }

  static async updateUser(id: string, updateData: Partial<User>, projection?: Projection<User>): Promise<{
    error: boolean, message: string, user: User | null,
  }> {
    try {
      const user = await UserModel.findByIdAndUpdate(id, updateData, { new: true })
        .select(projection || { email: 1, userName: 1, phoneNumber: 1 })
        .lean();
      if (!user) {
        return { error: true, message: ErrorMessages.USER_NOT_FOUND, user: null };
      }
      return { error: false, message: SuccessMessages.USER_UPDATED, user };
    } catch (error) {
      logger.error(`Error updating user: ${(error as Error).message}`);
      return { error: true, message: ErrorMessages.USER_UPDATE_FAILED, user: null };
    }
  }
}
