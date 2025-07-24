import { prismaClient } from '../application/database';
import { ResponseError } from '../error/response-error';
import { toVehicleResponse, VehicleResponse } from '../model/vehicle.model';

export class VehicleService {
  static async list(): Promise<VehicleResponse[]> {
    const vehicles = await prismaClient.vehicle.findMany();

    return vehicles.map((vehicle) => toVehicleResponse(vehicle));
  }

  static async get(vehicleId: number): Promise<VehicleResponse> {
    const vehicle = await prismaClient.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new ResponseError(404, 'Vehicle not found.');
    }

    return toVehicleResponse(vehicle);
  }
}
