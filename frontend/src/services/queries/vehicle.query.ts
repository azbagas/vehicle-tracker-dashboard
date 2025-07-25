import { useQuery } from '@tanstack/react-query';
import { getVehicle, getVehicles } from '../api/vehicle.api';

export function useVehicles() {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: getVehicles,
  });
}

export function useVehicle(vehicleId: number) {
  return useQuery({
    queryKey: ['vehicle', vehicleId],
    queryFn: () => getVehicle(vehicleId),
  });
}
