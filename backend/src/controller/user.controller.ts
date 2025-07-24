import { Request, Response, NextFunction } from 'express';
import { RegisterUserRequest } from '../model/user.model';
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
}
