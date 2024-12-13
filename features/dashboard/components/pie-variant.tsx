/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useMemo } from "react"
import { Pie, PieChart, Cell, Legend } from "recharts"
import { formatPercentage } from "@/lib/utils"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type Props = {
  data?: {
    name: string,
    amount: number
  }[]
}

export function PieVariant({ data }: Props) {

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
      <PieChart>
        <Legend
          layout="horizontal"
          align="left"
          verticalAlign="bottom"
          iconType="circle"
          content={({ payload }: any) => {
            return (
              <ul className="flex items-center gap-x-4 flex-wrap">
                {payload.map((entry: any, index: any) => {
                  const color = entry.color
                  const percent = entry.payload.percent
                  const name = entry.value

                  return (
                    <li className="flex items-center gap-x-2" key={`item-${index}`}>
                      <span style={{ backgroundColor: color }} className="rounded-full size-2" />
                      <div className="flex items-center gap-x-1">
                        <p className="text-muted-foreground text-sm">{name}</p>
                        <span className="text-sm">{formatPercentage(percent * 100,  { addPrefix: false })}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884d8"
          dataKey="amount"
          labelLine={false}
        >
          {chartData.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}

