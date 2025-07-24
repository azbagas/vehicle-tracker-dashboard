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

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
