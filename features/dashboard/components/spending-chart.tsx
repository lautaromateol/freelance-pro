import { useState } from "react"
import { PieChart, RadarIcon, Target } from "lucide-react"
import { PieVariant } from "@/features/dashboard/components/pie-variant"
import { RadarVariant } from "@/features/dashboard/components/radar-variant"
import { RadialVariant } from "@/features/dashboard/components/radial-variant"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  data?: {
    amount: number,
    name: string,
  }[],
  dateRange: string
}

export function SpendingChart({ data, dateRange }: Props) {

  const [variant, setVariant] = useState<string>("pie")

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex lg:flex-row space-y-2 lg:space-y-0 items-center justify-between">
        <div className="space-y-2">
          <CardTitle className="text-xl">Expenses by category</CardTitle>
          <CardDescription>{dateRange}</CardDescription>
        </div>
        <Select defaultValue={variant} onValueChange={(value: string) => setVariant(value)}>
          <SelectTrigger className="lg:w-auto rounded-lg self-start" aria-label="Select a variant">
            <SelectValue placeholder="Pie" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="pie" className="rounded-lg">
              <div className="flex items-center gap-x-2">
                <p className="text-sm">Pie</p>
                <PieChart className="size-4" />
              </div>
            </SelectItem>
            <SelectItem value="radar" className="rounded-lg">
              <div className="flex items-center gap-x-2">
                <p className="text-sm">Radar</p>
                <RadarIcon className="size-4" />
              </div>
            </SelectItem>
            <SelectItem value="radial" className="rounded-lg">
              <div className="flex items-center gap-x-2">
                <p className="text-sm">Radial</p>
                <Target className="size-4" />
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {variant === "pie" && <PieVariant data={data} />}
        {variant === "radar" && <RadarVariant data={data} />}
        {variant === "radial" && <RadialVariant data={data} />}
      </CardContent>
    </Card>
  )
}