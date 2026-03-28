import { IShortUrl } from "./models/short-url.ts";

export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface SignupRequestPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
}

export interface SignupResponse {
  token?: string;
}

export interface PaginationParams<T> {
  page?: number;
  limit?: number;
  continuationToken?: T;
}

export interface FetchUrlsRequestPayload extends PaginationParams<{
  id: string;
  createdAt: string;
}> {
  userId: string;
  search?: string;
  deleted?: boolean;
  active?: boolean;
}

export interface FetchUrlsResponse {
  urls: (Partial<IShortUrl> & { id: string })[];
  continuationToken?: {
    id: string;
    createdAt: string;
  };
}
