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

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const vehicleId = parseInt(req.params.id, 10);
      const result = await VehicleService.get(vehicleId);
      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
