import { useState } from "react"
import { AreaChart as AreaChartIcon, BarChart as BarChartIcon, LineChart as LineChartIcon } from "lucide-react"
import { AreaVariant } from "@/features/dashboard/components/area-variant"
import { BarVariant } from "@/features/dashboard/components/bar-variant"
import { LineVariant } from "@/features/dashboard/components/line-variant"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  data?: {
    expenses: number,
    income: number,
    date: string,
  }[],
  dateRange: string
}

export function TransactionsChart({ data, dateRange }: Props) {

  const [variant, setVariant] = useState<string>("area")

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex lg:flex-row space-y-2 lg:space-y-0 items-center justify-between">
        <div className="space-y-2">
          <CardTitle className="text-xl">Transactions</CardTitle>
          <CardDescription>{dateRange}</CardDescription>
        </div>
        <Select defaultValue={variant} onValueChange={(value: string) => setVariant(value)}>
          <SelectTrigger className="lg:w-auto rounded-lg self-start" aria-label="Select a variant">
            <SelectValue placeholder="Area" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="area" className="rounded-lg">
              <div className="flex items-center gap-x-2">
                <p className="text-sm">Area</p>
                <AreaChartIcon className="size-4" />
              </div>
            </SelectItem>
            <SelectItem value="bar" className="rounded-lg">
              <div className="flex items-center gap-x-2">
                <p className="text-sm">Bar</p>
                <BarChartIcon className="size-4" />
              </div>
            </SelectItem>
            <SelectItem value="line" className="rounded-lg">
              <div className="flex items-center gap-x-2">
                <p className="text-sm">Line</p>
                <LineChartIcon className="size-4" />
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {variant === "area" && <AreaVariant data={data} />}
        {variant === "bar" && <BarVariant data={data} />}
        {variant === "line" && <LineVariant data={data} />}
      </CardContent>
    </Card>
  )
}