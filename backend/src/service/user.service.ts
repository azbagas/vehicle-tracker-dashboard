import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { TokenResponse } from '../model/refreshToken.model';
import {
  GetNewAccessTokenRequest,
  LoginUserRequest,
  LogoutUserRequest,
  RegisterUserRequest,
  toUserResponse,
  UserJWTPayload,
  UserResponse,
} from '../model/user.model';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/auth';
import { UserValidation } from '../validation/user.validation';
import { Validation } from '../validation/validation';
import bcrypt from 'bcrypt';

export class UserService {
  static async register(request: RegisterUserRequest): Promise<UserResponse> {
    const validatedData = Validation.validate(UserValidation.REGISTER, request);

    // Check password confirmation
    if (validatedData.password !== validatedData.password_confirmation) {
      throw new ResponseError(400, 'Password and password confirmation do not match.');
    }

    const totalUserWithSameEmail = await prismaClient.user.count({
      where: {
        email: validatedData.email,
      },
    });

    if (totalUserWithSameEmail != 0) {
      throw new ResponseError(400, 'Email already exists');
    }

    validatedData.password = await bcrypt.hash(validatedData.password, 10);

    // Remove password confirmation from data to be saved

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

  static async getNewAccessToken(
    request: GetNewAccessTokenRequest
  ): Promise<Omit<TokenResponse, 'refreshToken'>> {
    const validatedData = Validation.validate(
      UserValidation.GET_NEW_ACCESS_TOKEN,
      request
    );
    const refreshToken = validatedData.refreshToken;

    // Check if refresh token exists in database
    const existingRefreshToken = await prismaClient.refreshToken.findFirst({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!existingRefreshToken) {
      throw new ResponseError(401, 'Invalid refresh token.');
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    if (decoded == 'EXPIRED') {
      // Delete refresh token
      await prismaClient.refreshToken.delete({
        where: {
          id: existingRefreshToken.id,
        },
      });

      throw new ResponseError(
        401,
        'Refresh token expired. Please login again.'
      );
    } else if (decoded == 'INVALID') {
      throw new ResponseError(401, 'Invalid refresh token.');
    }

    // Generate new access token
    const payload: UserJWTPayload = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
    };

    const accessToken = generateAccessToken(payload);

    return {
      accessToken,
    };
  }

  static async logout(request: LogoutUserRequest): Promise<TokenResponse> {
    const validatedData = Validation.validate(UserValidation.LOGOUT, request);
    const refreshToken = validatedData.refreshToken;

    const existingRefreshToken = await prismaClient.refreshToken.findFirst({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!existingRefreshToken) {
      throw new ResponseError(401, 'Invalid refresh token.');
    }

    // Delete refresh token
    await prismaClient.refreshToken.delete({
      where: {
        id: existingRefreshToken.id,
      },
    });

    return {
      accessToken: '',
      refreshToken: '',
    };
  }
}
