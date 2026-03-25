import { HydratedDocument } from "mongoose";
import logger from "@url-shortener/logger";
import { MongoServerError } from "mongodb";
import { IUser } from "../../types/models/user.ts";
import { UserModel } from "../models/user.model.ts";
import { SuccessMessages, ErrorMessages } from "../../constants/messages.ts";

export class UserQueries {
  static async createUser(email: string, password: string): Promise<{
    error: boolean, message: string, user: HydratedDocument<IUser> | null,
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

  static async findUserByEmail(email: string): Promise<{
    error: boolean, message: string, user: IUser | null
  }> {
    try {
      const user = await UserModel.findOne({ email })
        .select({ password: 0 })
        .lean();
      return { error: false, message: SuccessMessages.USER_FOUND, user };
    } catch (error) {
      logger.error(`Error searching for user: ${(error as Error).message}`);
      return { error: true, message: ErrorMessages.USER_SEARCH_FAILED, user: null };
    }
  }

  static async findUserById(id: string): Promise<{ error: boolean, message: string, user: IUser | null }> {
    try {
      const user = await UserModel.findById(id)
        .select({ password: 0 })
        .lean();
      return { error: false, message: SuccessMessages.USER_FOUND, user };
    } catch (error) {
      logger.error(`Error finding user by ID: ${(error as Error).message}`);
      return { error: true, message: ErrorMessages.USER_SEARCH_FAILED, user: null };
    }
  }

  static async updateUser( id: string, updateData: Partial<IUser> ): Promise<{
    error: boolean, message: string, user: IUser | null,
  }> {
    try {
      const user = await UserModel.findByIdAndUpdate(id, updateData, { new: true })
        .select(updateData)
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
