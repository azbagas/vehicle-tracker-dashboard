import { Vehicle } from '../../generated/prisma';

export type VehicleResponse = {
  id: number;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  fuel_level: number;
  odometer: number;
  latitude: number;
  longitude: number;
  speed: number;
  updated_at: string;
};

export function toVehicleResponse(vehicle: Vehicle): VehicleResponse {
  return {
    id: vehicle.id,
    name: vehicle.name,
    status: vehicle.status,
    fuel_level: vehicle.fuel_level,
    odometer: vehicle.odometer,
    latitude: vehicle.latitude,
    longitude: vehicle.longitude,
    speed: vehicle.speed,
    updated_at: vehicle.updated_at.toISOString(),
  };
}
