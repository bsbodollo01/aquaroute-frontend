import { Card, CardContent, CardHeader, CardFooter } from "../ui/card"
import { LucideIcon,  } from "lucide-react"

interface CardProps {
    title: string,
    value: number,
    icon: LucideIcon,
    iconColor: string;
    iconBgColor:string
    stats: string,
}

const SellerSummaryCards = ({title, value, stats, icon: Icon, iconColor, iconBgColor}: CardProps) => {
  return (
    <div>
        <Card className="shadow-md hover:shadow-lg transition-shadow gap-0">
            <CardHeader>
                <p className="text-black font-medium text-sm">{title}</p>
            </CardHeader>
            <CardContent className="">
              <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold mt-2">{value}</p>
                <Icon className={`w-10 h-10 p-2 rounded-md ${iconColor} ${iconBgColor}` }/>
              </div>
            </CardContent>
            <CardFooter className="pt-5 justify-end">
              <p className="text-xs text-gray-500 mt-1">
                <span className={true ? 'text-green-600' : 'text-red-600'}>
                  {stats}
                </span>{' '}
                from last month
              </p>
            </CardFooter>
          </Card>
    </div>
  )
}

export default SellerSummaryCards