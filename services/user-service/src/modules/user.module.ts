import { ParsedQs } from 'qs';
import { Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { LoginController } from '../controllers/user.controller.ts';
import { IRequest, LoginRequestPayload, responseFmt, SignupRequestPayload } from '@url-shortener/common';

export class LoginModule {
  static login = async (
    req: IRequest<ParamsDictionary, unknown, LoginRequestPayload, ParsedQs>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password } = req.body;
      const response = await LoginController.login({ email, password });
      res.json(responseFmt(response));
    } catch (error) {
      console.error('Error', error);
      next(error);
    }
  }

  static signup = async (
    req: IRequest<ParamsDictionary, unknown, SignupRequestPayload, ParsedQs>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password } = req.body;
      const response = await LoginController.signup({ email, password });
      res.json(responseFmt(response));
    } catch (error) {
      console.error('Error', error);
      next(error);
    }
  }
}
