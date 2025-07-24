import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    name: z.string({
      required_error: 'Name is required.',
    }),
    email: z
      .string({
        required_error: 'Email is required.',
      })
      .email('Email is not valid.'),
    password: z
      .string({
        required_error: 'Password is required.',
      })
      .min(6, 'Password minimum 6 characters.'),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z
      .string({
        required_error: 'Email is required.',
      })
      .email('Email is not valid.'),
    password: z
      .string({
        required_error: 'Password is required.',
      })
      .min(6, 'Password minimum 6 characters.'),
  });

  static readonly GET_NEW_ACCESS_TOKEN: ZodType = z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required.',
    }),
  });

  static readonly LOGOUT: ZodType = z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required.',
    }),
  });
}
