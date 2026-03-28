export interface IShortUrl {
  userId: string;
  name: string;
  tags: string[];
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
