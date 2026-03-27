import { ParsedQs } from 'qs';
import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { LoginController } from '../controllers/user.controller.js';
import { LoginRequestPayload, SignupRequestPayload } from '@url-shortener/common';

export class LoginModule {
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

  static signup = async (
    req: Request<ParamsDictionary, unknown, SignupRequestPayload, ParsedQs>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password } = req.body;
      const response = await LoginController.signup({ email, password });
      res.json(response);
    } catch (error) {
      console.error('Error', error);
      next(error);
    }
  }
}
