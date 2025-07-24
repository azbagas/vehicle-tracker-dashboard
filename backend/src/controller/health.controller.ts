import { NextFunction, Request, Response } from 'express';

export class HealthController {
  static async ping(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('pong');
    } catch (error) {
      next(error);
    }
  }
}
