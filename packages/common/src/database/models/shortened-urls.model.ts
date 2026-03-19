import { model, Schema } from 'mongoose';

export interface IShortenedURL {
  userId: string;
  originalUrl: string;
  shortenedUrl: string;
  active: boolean;
  deleted: boolean;
  expired: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const shortenedURLSchema = new Schema<IShortenedURL>(
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

export const ShortenedURL = model<IShortenedURL>('ShortenedURL', shortenedURLSchema);
