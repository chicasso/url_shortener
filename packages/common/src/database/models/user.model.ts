import { model, Schema } from 'mongoose';

export interface IUser {
  email: string;
  userName: string;
  password: string;
  countryCode: string;
  phoneNumber: string;
  subscriptionId: string;
  profileUrl: string;
  profileIcon: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  userName: { type: String },
  password: {
    type: String,
    required: true,
  },
  countryCode: { type: String },
  phoneNumber: { type: String },
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
}, { timestamps: true });

userSchema.index({ email: 1 });
userSchema.index({ phoneNumber: 1 });

export const User = model<IUser>('User', userSchema);
