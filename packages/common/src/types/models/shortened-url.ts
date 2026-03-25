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
