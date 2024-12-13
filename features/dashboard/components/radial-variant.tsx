/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useMemo } from "react"
import { RadialBar, RadialBarChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type Props = {
  data?: {
    amount: number,
    name: string
  }[]
}

export function RadialVariant({ data }: Props) {

  const chartData = useMemo(() => data || [], [data])

  const config = useMemo(() =>
    chartData.reduce<Record<string, { label: string, color: string }>>((acc, el, i) => {
      acc[el.name.toLowerCase()] = {
        label: el.name,
        color: `hsl(var(--chart-${i + 1}))`
      }
      return acc
    }, {}), [chartData])

  const chartConfig = {
    amount: {
      label: "Amount",
    },
    ...config
  } satisfies ChartConfig

  const COLORS = Object.values(config).map(item => item.color)

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <RadialBarChart
        innerRadius={30}
        outerRadius={110}
        data={chartData?.map((item, index) => ({
          ...item,
          fill: COLORS[index % COLORS.length]
        }))}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="name" />}
        />
        <RadialBar
          dataKey="amount"
          background
        />
      </RadialBarChart>
    </ChartContainer>
  )
}
