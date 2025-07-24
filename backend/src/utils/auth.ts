import jwt from 'jsonwebtoken';
import { UserJWTPayload } from '../model/user.model';

export const generateAccessToken = (payload: UserJWTPayload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });
};

export const generateRefreshToken = (payload: UserJWTPayload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
  });
};

export const verifyAccessToken = (
  accessToken: string
): UserJWTPayload | 'EXPIRED' | 'INVALID' => {
  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    ) as UserJWTPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return 'EXPIRED';
    } else if (error) {
      return 'INVALID';
    }
  }
};

export const verifyRefreshToken = (
  refreshToken: string
): UserJWTPayload | 'EXPIRED' | 'INVALID' => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    ) as UserJWTPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return 'EXPIRED';
    } else if (error) {
      return 'INVALID';
    }
  }
};
