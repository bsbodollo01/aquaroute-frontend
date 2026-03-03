import { MapPin, Navigation } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components//ui/card';
import { Badge } from '../ui/badge';

const activeDeliveries = [
  {
    id: 'DEL-001',
    driver: 'Robert Martinez',
    location: 'Downtown Area',
    orders: 3,
    eta: '15 min',
    status: 'on-time',
  },
  {
    id: 'DEL-002',
    driver: 'Lisa Anderson',
    location: 'North District',
    orders: 2,
    eta: '25 min',
    status: 'on-time',
  },
  {
    id: 'DEL-003',
    driver: 'James Taylor',
    location: 'East Side',
    orders: 3,
    eta: '40 min',
    status: 'delayed',
  },
];

const DeliveryMap = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Deliveries</CardTitle>
        <CardDescription>Real-time tracking of ongoing deliveries</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Mock map visualization */}
          <div className="relative bg-gray-100 rounded-lg h-48 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-center z-10">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Live Delivery Tracking</p>
            </div>
          </div>

          {/* Active delivery list */}
          <div className="space-y-3">
            {activeDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Navigation className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{delivery.driver}</div>
                    <div className="text-sm text-gray-500">
                      {delivery.location} • {delivery.orders} orders
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className={
                      delivery.status === 'on-time'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-orange-100 text-orange-800'
                    }
                  >
                    ETA: {delivery.eta}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DeliveryMap