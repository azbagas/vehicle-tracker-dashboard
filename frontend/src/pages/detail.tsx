import { useVehicle } from '@/services/queries/vehicle.query';
import { Link, useParams } from 'react-router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function Detail() {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const { data, isPending, error } = useVehicle(Number(vehicleId));

  if (isPending) {
    return <div className="text-center py-10">Loading vehicle data...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-10">
        Error loading vehicle: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Back button */}
      <Link
        to="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-center mb-6">Vehicle Detail</h1>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{data.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium">ID:</span> {data.id}
          </p>
          <p>
            <span className="font-medium">Status:</span>{' '}
            <Badge
              variant={data.status === 'ACTIVE' ? 'default' : 'destructive'}
            >
              {data.status === 'ACTIVE' ? 'Active' : 'Inactive'}
            </Badge>
          </p>
        </CardContent>
      </Card>

      {/* Technical Info */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-medium">Fuel Level</p>
            <p>{data.fuel_level}%</p>
          </div>
          <div>
            <p className="font-medium">Odometer</p>
            <p>{data.odometer} km</p>
          </div>
          <div>
            <p className="font-medium">Speed</p>
            <p>{data.speed} km/h</p>
          </div>
          <div>
            <p className="font-medium">Last Updated</p>
            <p>{new Date(data.updated_at).toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>

      {/* Location Info */}
      <Card>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium">Latitude:</span> {data.latitude}
          </p>
          <p>
            <span className="font-medium">Longitude:</span> {data.longitude}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Detail;
