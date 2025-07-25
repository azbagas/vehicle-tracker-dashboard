import { User } from '../../generated/prisma';

export type UserResponse = {
  id: number;
  name: string;
  email: string;
};

export type RegisterUserRequest = {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
}

export type UserJWTPayload = {
  id: number;
  name: string;
  email: string;
};

export type GetNewAccessTokenRequest = {
  refreshToken: string;
}

export type LogoutUserRequest = {
  refreshToken: string;
}

export type LoginResponse = {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
