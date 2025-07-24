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

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
