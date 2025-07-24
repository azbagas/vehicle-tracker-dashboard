import { Request, Response, NextFunction } from 'express';
import { LoginUserRequest, RegisterUserRequest, UserJWTPayload } from '../model/user.model';
import { UserService } from '../service/user.service';

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as RegisterUserRequest;
      const result = await UserService.register(request);

      res.status(201).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as LoginUserRequest;
      const result = await UserService.login(request);

      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCurrent(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserJWTPayload;
      const result = await UserService.getCurrent(user);

      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
