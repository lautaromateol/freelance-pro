"use client"
import { useMemo } from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  amount: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

type Props = {
  data?: {
    name: string,
    amount: number
  }[]
}

export function RadarVariant({ data }: Props) {

  const chartData = useMemo(() => data || [], [data])

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="name" />
        <PolarGrid />
        <Radar
          dataKey="amount"
          fill="var(--color-amount)"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ChartContainer>
  )
}
