import { Response, LoginResponse, LoginRequestPayload, UserQueries } from '@url-shortener/common';

export class LoginController {
  static async login(params: LoginRequestPayload): Promise<Response<LoginResponse>> {
    const { email, password } = params;
    const userResp = await UserQueries.findUserByEmail(email);
    if (userResp.error) {
      return { success: false, statusCode: 500, message: userResp.message };
    }
    if (!userResp.user) {
      return {
        success: false,
        statusCode: 401,
        message: 'Invalid email or password',
      };
    }

    if (userResp.user.password !== password) {
      return {
        success: false,
        statusCode: 401,
        message: 'Invalid email or password',
      };
    }
    return {
      success: true,
      statusCode: 200,
      data: {
        token: 'mocked-jwt-token',
      }, 
    };
  }
}
