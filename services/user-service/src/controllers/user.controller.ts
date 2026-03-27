import {
  Response,
  UserQueries,
  LoginResponse,
  LoginRequestPayload,
  SignupResponse,
  SignupRequestPayload,
  Codes,
} from '@url-shortener/common';
import bcrypt from 'bcrypt';
import { sign } from '@url-shortener/common';

export class LoginController {
  static async login(params: LoginRequestPayload): Promise<Response<LoginResponse>> {
    const { email, password } = params;
    const userResp = await UserQueries.findUserByEmail(email, { password: 1 });
    if (userResp.error) {
      return { statusCode: Codes.SERVICE_UNAVAILABLE, message: userResp.message };
    }
    if (
      !userResp.user
      || !userResp.user.password
      || !bcrypt.compareSync(password, userResp.user.password)
    ) {
      return { statusCode: Codes.UNAUTHORIZED, message: 'Invalid email or password' };
    }
    const token = sign({ userId: userResp.user._id });
    return { statusCode: Codes.OK, data: { token }, message: 'Login successful' };
  }

  static async signup(params: SignupRequestPayload): Promise<Response<SignupResponse>> {
    const { email, password } = params;
    const existingUserResp = await UserQueries.findUserByEmail(email, { _id: 1 });
    if (existingUserResp.error) {
      return { statusCode: Codes.SERVICE_UNAVAILABLE, message: existingUserResp.message };
    }
    if (existingUserResp.user) {
      return { statusCode: Codes.BAD_REQUEST, message: 'Email already exists' };
    }
    const userResp = await UserQueries.createUser(email, password);
    if (userResp.error || !userResp.user) {
      return { statusCode: Codes.SERVICE_UNAVAILABLE, message: userResp.message };
    }
    const token = sign({ userId: userResp.user._id });
    return { statusCode: Codes.CREATED, data: { token }, message: 'Signup successful' };
  }
}
