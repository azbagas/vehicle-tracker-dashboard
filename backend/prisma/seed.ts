import { PrismaClient, Status } from '../generated/prisma';
const prisma = new PrismaClient();

async function main() {
  const vehicles = [
    {
      id: 1,
      name: 'Toyota Avanza',
      status: 'ACTIVE',
      fuel_level: 78.5,
      odometer: 12045.2,
      latitude: -6.2001,
      longitude: 106.8456,
      speed: 62.3,
      updated_at: new Date('2025-07-24T14:01:00.000Z'),
    },
    {
      id: 2,
      name: 'Honda Brio',
      status: 'ACTIVE',
      fuel_level: 35.0,
      odometer: 20234.8,
      latitude: -7.8012,
      longitude: 110.3646,
      speed: 40.1,
      updated_at: new Date('2025-07-24T13:50:00.000Z'),
    },
    {
      id: 3,
      name: 'Suzuki Ertiga',
      status: 'INACTIVE',
      fuel_level: 12.4,
      odometer: 8754.3,
      latitude: -6.9147,
      longitude: 107.6098,
      speed: 0.0,
      updated_at: new Date('2025-07-24T12:20:00.000Z'),
    },
    {
      id: 4,
      name: 'Daihatsu Xenia',
      status: 'ACTIVE',
      fuel_level: 90.2,
      odometer: 1432.5,
      latitude: -8.4095,
      longitude: 115.1889,
      speed: 80.7,
      updated_at: new Date('2025-07-24T13:35:00.000Z'),
    },
    {
      id: 5,
      name: 'Mitsubishi Pajero',
      status: 'INACTIVE',
      fuel_level: 50.0,
      odometer: 50320.0,
      latitude: -0.7893,
      longitude: 113.9213,
      speed: 0.0,
      updated_at: new Date('2025-07-24T10:00:00.000Z'),
    },
    {
      id: 6,
      name: 'Isuzu Panther',
      status: 'ACTIVE',
      fuel_level: 67.7,
      odometer: 33440.6,
      latitude: -6.1214,
      longitude: 106.7741,
      speed: 45.2,
      updated_at: new Date('2025-07-24T13:15:00.000Z'),
    },
    {
      id: 7,
      name: 'Toyota Fortuner',
      status: 'ACTIVE',
      fuel_level: 99.9,
      odometer: 150.3,
      latitude: -7.2504,
      longitude: 112.7688,
      speed: 95.0,
      updated_at: new Date('2025-07-24T14:05:00.000Z'),
    },
    {
      id: 8,
      name: 'Wuling Confero',
      status: 'INACTIVE',
      fuel_level: 20.0,
      odometer: 18200.0,
      latitude: -3.4167,
      longitude: 114.5833,
      speed: 0.0,
      updated_at: new Date('2025-07-24T09:50:00.000Z'),
    },
    {
      id: 9,
      name: 'Nissan Livina',
      status: 'ACTIVE',
      fuel_level: 55.3,
      odometer: 10990.0,
      latitude: -6.1754,
      longitude: 106.8272,
      speed: 73.5,
      updated_at: new Date('2025-07-24T13:59:00.000Z'),
    },
    {
      id: 10,
      name: 'Hyundai Stargazer',
      status: 'ACTIVE',
      fuel_level: 88.8,
      odometer: 500.2,
      latitude: -7.0051,
      longitude: 110.4381,
      speed: 60.0,
      updated_at: new Date('2025-07-24T13:45:00.000Z'),
    },
  ];

  for (const {
    id,
    name,
    status,
    fuel_level,
    odometer,
    latitude,
    longitude,
    speed,
    updated_at,
  } of vehicles) {
    await prisma.vehicle.upsert({
      where: { id },
      update: {},
      create: {
        id,
        name,
        status: status as Status,
        fuel_level,
        odometer,
        latitude,
        longitude,
        speed,
        updated_at,
      },
    });
  }

  console.log('Seeded vehicles!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // process.exit(1);
  });
