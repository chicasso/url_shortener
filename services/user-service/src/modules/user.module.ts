import { ParsedQs } from 'qs';
import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { LoginRequestPayload } from '@url-shortener/common';
import LoginController from '../controllers/login.controller.js';

export default class LoginModule {
  static login = async (
    req: Request<ParamsDictionary, unknown, LoginRequestPayload, ParsedQs>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password } = req.body;
      const response = await LoginController.login({ email, password });
      res.json(response);
    } catch (error) {
      console.error('Error', error);
      next(error);
    }
  }
}
