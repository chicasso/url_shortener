import mongoose, { model, Schema } from 'mongoose';
import { IShortenedURL } from '../../types/models/shortened-url.ts';

export interface ShortenedURL extends IShortenedURL, mongoose.Document {};

const shortenedURLSchema = new Schema<ShortenedURL>(
  {
    userId: {
      type: String,
      required: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    shortenedUrl: {
      type: String,
      unique: true,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
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

shortenedURLSchema.index({ userId: 1, expired: 1 });
shortenedURLSchema.index({ expired: 1, expiresAt: 1 });
shortenedURLSchema.index({ shortenedUrl: 1, expired: 1 });

export const ShortenedURLModel = model<ShortenedURL>('ShortenedURL', shortenedURLSchema);
