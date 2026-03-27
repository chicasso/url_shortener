import mongoose, { model, Schema } from 'mongoose';
import { IShortUrl } from '../../types/models/short-url.js';

export interface ShortUrl extends IShortUrl, mongoose.Document {};

const ShortUrlSchema = new Schema<ShortUrl>(
  {
    userId: {
      type: String,
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      unique: true,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    deactivatedAt: { type: Date },
    deleted: {
      type: Boolean,
      default: false,
    },
    expired: {
      type: Boolean,
      default: false,
    },
    expiresAt: { type: Date },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

ShortUrlSchema.index({ userId: 1, expired: 1 });
ShortUrlSchema.index({ expired: 1, expiresAt: 1 });
ShortUrlSchema.index({ shortUrl: 1, expired: 1 });

export const ShortUrlModel = model<ShortUrl>('short_url', ShortUrlSchema);
