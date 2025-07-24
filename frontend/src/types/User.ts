import { z } from 'zod';

/* ---------------------------------- Types --------------------------------- */
export type User = {
  id: number;
  name: string;
  email: string;
};

/* --------------------------------- Schemas -------------------------------- */
export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  password_confirmation: z.string().min(6),
});

export type Register = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type Login = z.infer<typeof loginSchema>;
