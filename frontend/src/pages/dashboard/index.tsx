import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useVehicles } from '@/services/queries/vehicle.query';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router';

export default function Dashboard() {
  const { data, isPending, error } = useVehicles();

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading vehicles: {error.message}</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Loop through data */}
      {data.map((vehicle) => (
        <Card key={vehicle.id}>
          <CardHeader>
            <CardTitle>{vehicle.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <span>Status: </span>
            <Badge
              variant={vehicle.status === 'ACTIVE' ? 'default' : 'destructive'}
            >
              {vehicle.status === 'ACTIVE' ? 'Active' : 'Inactive'}
            </Badge>
            <Link
              to={`/vehicles/${vehicle.id}`}
              className="block mt-4 text-center text-secondary-foreground bg-secondary p-2 rounded hover:bg-gray-200 transition-all"
            >
              View Details
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
