export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}
