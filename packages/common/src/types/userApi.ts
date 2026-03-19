export interface LoginRequestPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
