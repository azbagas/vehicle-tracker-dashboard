import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { TokenResponse } from '../model/refreshToken.model';
import {
  LoginUserRequest,
  RegisterUserRequest,
  toUserResponse,
  UserJWTPayload,
  UserResponse,
} from '../model/user.model';
import { generateAccessToken, generateRefreshToken } from '../utils/auth';
import { UserValidation } from '../validation/user.validation';
import { Validation } from '../validation/validation';
import bcrypt from 'bcrypt';

export class UserService {
  static async register(request: RegisterUserRequest): Promise<UserResponse> {
    const validatedData = Validation.validate(UserValidation.REGISTER, request);

    const totalUserWithSameEmail = await prismaClient.user.count({
      where: {
        email: validatedData.email,
      },
    });

    if (totalUserWithSameEmail != 0) {
      throw new ResponseError(400, 'Email already exists');
    }

    validatedData.password = await bcrypt.hash(validatedData.password, 10);

    const user = await prismaClient.user.create({
      data: validatedData,
    });

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<TokenResponse> {
    const validatedData = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (!user) {
      throw new ResponseError(401, 'Email or password is wrong');
    }

    const isPasswordValid = await bcrypt.compare(
      validatedData.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, 'Email or password is wrong');
    }

    // Generate JWT
    const payload: UserJWTPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prismaClient.refreshToken.create({
      data: {
        user_id: user.id,
        refresh_token: refreshToken,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  static async getCurrent(user: UserJWTPayload): Promise<UserResponse> {
    const currentUser = await prismaClient.user.findUnique({
      where: { id: user.id },
    });

    if (!currentUser) {
      throw new ResponseError(404, 'User not found.');
    }

    return toUserResponse(currentUser);
  }
}
