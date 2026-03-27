export interface IShortUrl {
  userId: string;
  originalUrl: string;
  shortUrl: string;
  active: boolean;
  deactivatedAt: Date;
  deleted: boolean;
  expired: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
