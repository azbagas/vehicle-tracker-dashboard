export type Vehicle = {
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

export type VehicleList = {
  id: number;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
};
