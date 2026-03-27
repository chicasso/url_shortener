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
