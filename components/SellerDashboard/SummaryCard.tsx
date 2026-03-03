import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { OrderTable } from '../Orders/OrderTable';
import { sampleOrders } from '@/utils/sampleOrders'
import { Order } from "@/utils/orderTypes"

interface summaryCardProps {
  orders: Order[],
  onUpdateStatus: (orderId: string, status: Order['status']) => void
}


const SummaryCard = ({orders, onUpdateStatus}: summaryCardProps) => {
    return (
        <Card className="shadow-md !gap-0">
            <CardHeader className="border-b border-border/10">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="">
            <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All (1)</TabsTrigger>
                <TabsTrigger value="pending">Pending (2)</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed (3)</TabsTrigger>
                <TabsTrigger value="delivered">Delivered (4)</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                <OrderTable
                    orders={sampleOrders}
                    onUpdateStatus={onUpdateStatus}
                />
                </TabsContent>

                <TabsContent value="pending">
                <OrderTable
                    orders={sampleOrders.filter((o) => o.status === 'pending')}
                    onUpdateStatus={onUpdateStatus}
                />
                </TabsContent>

                <TabsContent value="confirmed">
                <OrderTable
                    orders={sampleOrders.filter((o) => o.status === 'confirmed')}
                    onUpdateStatus={onUpdateStatus}
                />
                </TabsContent>

                <TabsContent value="delivered">
                <OrderTable
                    orders={sampleOrders.filter((o) => o.status === 'delivered')}
                    onUpdateStatus={onUpdateStatus}
                />
                </TabsContent>
            </Tabs>
            </CardContent>
        </Card>
  )
}

export default SummaryCard