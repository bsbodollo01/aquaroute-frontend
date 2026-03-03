import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components//ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', revenue: 1200 },
  { name: 'Tue', revenue: 1800 },
  { name: 'Wed', revenue: 1600 },
  { name: 'Thu', revenue: 2200 },
  { name: 'Fri', revenue: 2400 },
  { name: 'Sat', revenue: 2800 },
  { name: 'Sun', revenue: 2100 },
];

const RevenueChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Revenue</CardTitle>
        <CardDescription>Revenue performance for the current week</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value) => `$${value}`}
              contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default RevenueChart