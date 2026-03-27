import mongoose, { model, Schema } from 'mongoose';
import { IUser } from '../../types/models/user.ts';

export interface User extends IUser, mongoose.Document {};

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      unique: true,
    },
    userName: { type: String },
    password: { type: String },
    countryCode: { type: String },
    phoneNumber: {
      type: String,
      unique: true,
    },
    subscriptionId: { type: String },
    profileUrl: { type: String },
    profileIcon: { type: String },
    deleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false },
);

userSchema.index({ email: 1 });
userSchema.index({ phoneNumber: 1 });

export const UserModel = model<User>('user', userSchema);
