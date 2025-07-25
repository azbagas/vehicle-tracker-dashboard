import axiosInstance from '@/lib/axiosInstance';
import type { Vehicle, VehicleList } from '@/types/Vehicle';

export async function getVehicles(): Promise<VehicleList[]> {
  const response = await axiosInstance.get('/vehicles');
  return response.data.data;
}

export async function getVehicle(vehicleId: number): Promise<Vehicle> {
  const response = await axiosInstance.get(`/vehicles/${vehicleId}`);
  return response.data.data;
}
