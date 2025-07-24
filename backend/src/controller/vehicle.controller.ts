import { Request, Response, NextFunction } from 'express';
import { VehicleService } from '../service/vehicle.service';

export class VehicleController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await VehicleService.list();
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
