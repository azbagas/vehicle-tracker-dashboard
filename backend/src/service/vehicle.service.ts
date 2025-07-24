import { prismaClient } from '../application/database';
import { toVehicleResponse, VehicleResponse } from '../model/vehicle.model';

export class VehicleService {
  static async list(): Promise<VehicleResponse[]> {
    const vehicles = await prismaClient.vehicle.findMany();

    return vehicles.map((vehicle) => toVehicleResponse(vehicle));
  }
}
