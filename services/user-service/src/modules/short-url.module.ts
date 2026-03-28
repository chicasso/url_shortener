import { ParsedQs } from 'qs';
import { Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ShortUrlController } from '../controllers/short-url.controller.ts';
import { FetchUrlsRequestPayload, IRequest, responseFmt } from '@url-shortener/common';

export class ShortUrlModule {
  static fetch = async (
    req: IRequest<ParamsDictionary, unknown, FetchUrlsRequestPayload, ParsedQs>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const reqBody: FetchUrlsRequestPayload = req.body;
      const response = await ShortUrlController.fetch({
        ...reqBody,
        userId: req.user?.userId as string,
      });
      res.json(responseFmt(response));
    } catch (error) {
      console.error('Error', error);
      next(error);
    }
  }
}
