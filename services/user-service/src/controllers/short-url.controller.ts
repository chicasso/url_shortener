import {
  Response,
  Codes,
  FetchUrlsRequestPayload,
  FetchUrlsResponse,
} from '@url-shortener/common';
import { ShortUrlQueries } from '@url-shortener/common';

export class ShortUrlController {
  static async fetch(params: FetchUrlsRequestPayload): Promise<Response<FetchUrlsResponse>> {
    const urlsResp = await ShortUrlQueries.fetchShortUrls(
      params.userId,
      params.limit,
      params.continuationToken?.createdAt,
      params.continuationToken?.id,
      {
        _id: 1,
        name: 1,
        tags: 1,
        originalUrl: 1,
        shortUrl: 1,
        active: 1,
        deactivatedAt: 1,
        expired: 1,
        expiresAt: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    );
    if (urlsResp.error) {
      return { statusCode: Codes.SERVICE_UNAVAILABLE, message: urlsResp.message };
    }
    const urls = urlsResp.shortUrls.map((url) => {
      return {
        id: url._id.toString(),
        name: url.name,
        tags: url.tags,
        originalUrl: url.originalUrl,
        shortUrl: url.shortUrl,
        active: url.active,
        deactivatedAt: url.deactivatedAt,
        expired: url.expired,
        expiresAt: url.expiresAt,
        createdAt: url.createdAt,
        updatedAt: url.updatedAt,
      };
    });
    const continuationToken = urls.length ? {
      id: urls[urls.length - 1].id,
      createdAt: urls[urls.length - 1].createdAt.toISOString(),
    } : undefined;

    return {
      statusCode: Codes.OK,
      data: { urls, continuationToken },
      message: 'Urls fetched successfully',
    };
  }
}
