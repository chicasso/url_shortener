import { MongoServerError } from "mongodb";
import { HydratedDocument } from "mongoose";
import { IShortUrl } from "../../types/models/short-url.ts";
import { defaultLogger as logger } from "../../logger/logger.ts";
import { ErrorMessages, ShortUrlModel, SuccessMessages } from "../../index.ts";

export class ShortUrlQueries {
  static async createShortUrl({ userId, originalUrl, shortUrl, expiresAt }: {
    userId: string;
    originalUrl: string;
    shortUrl: string;
    expiresAt?: Date;
  }): Promise<{
    error: boolean,
    message: string,
    shortUrl: HydratedDocument<IShortUrl> | null,
  }> {
    try {
      const generatedShortUrl = await ShortUrlModel.create({
        userId, originalUrl, shortUrl, ...(expiresAt && { expiresAt }),
      });
      return { error: false, message: SuccessMessages.SHORT_URL_CREATED, shortUrl: generatedShortUrl };
    } catch (error) {
      logger.error(`Error creating short URL: ${(error as Error).message}`);
      if (error instanceof MongoServerError && error.code === 11000) {
        return { error: true, message: ErrorMessages.SHORT_URL_ALREADY_EXISTS, shortUrl: null };
      }
      return { error: true, message: ErrorMessages.SHORT_URL_CREATION_FAILED, shortUrl: null };
    }
  }

  static async fetchShortUrls(
    userId: string,
    limit: number = 10,
    createdAt?: Date,
    continuationToken?: string,
  ): Promise<{
    error: boolean,
    message: string,
    shortUrls: IShortUrl[],
  }> {
    try {
      const shortUrls = await ShortUrlModel.find({
        userId,
        expired: false,
        active: true,
        deleted: false,
        ...(createdAt && { createdAt: { $gte: createdAt } }),
        ...(continuationToken && { _id: { $gt: continuationToken } }),
      })
        .sort({ createdAt: -1, _id: -1 })
        .limit(limit)
        .lean();
      return { error: false, message: SuccessMessages.SHORT_URL_FETCHED, shortUrls };
    } catch (error) {
      logger.error(`Error fetching short URLs for user ${userId}: ${(error as Error).message}`);
      return { error: true, message: ErrorMessages.UNEXPECTED_ERROR, shortUrls: [] };
    }
  }

  static async deactivateShortUrl(id: string): Promise<{ error: boolean, message: string }> {
    try {
      const result = await ShortUrlModel.updateOne(
        { _id: id },
        {
          active: false,
          deactivatedAt: new Date(),
        },
      );
      if (result.modifiedCount === 0) {
        return { error: true, message: ErrorMessages.SHORT_URL_NOT_FOUND };
      }
      return { error: false, message: SuccessMessages.SHORT_URL_DEACTIVATED };
    } catch (error) {
      logger.error(`Error deactivating short URL ${id}: ${(error as Error).message}`);
      return { error: true, message: ErrorMessages.SHORT_URL_DEACTIVATION_FAILED };
    }
  }
}
