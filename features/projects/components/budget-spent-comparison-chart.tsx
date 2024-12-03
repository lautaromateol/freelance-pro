/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { convertToCurrency } from "@/lib/utils"

interface BudgetComparisonChartProps {
  budget: number
  spent: number
}

export function BudgetComparisonChart({ budget, spent }: BudgetComparisonChartProps) {
  const data = [
    { name: "Spent", value: spent },
    { name: "Remaining", value: budget - spent },
  ]

  const COLORS = ['#f43f5e', '#10b981']

  return (
    <ChartContainer
      config={{
        Remaining: {
          label: "Remaining",
          color: COLORS[1],
        },
        Spent: {
          label: "Spent",
          color: COLORS[0],
        },
      }}
      className="h-[200px] w-[200px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <ChartTooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

function CustomTooltip({ active, payload }: any) {

  if (!active) return null

  const name = payload[0].name
  const value = payload[0].value
  const fill = payload[0].payload.fill

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div style={{ backgroundColor: fill }} className="size-1.5 rounded-full" />
            <p className="text-sm text-muted-foreground">
              {name}
            </p>
          </div>
          <p className="text-sm text-right font-medium">
            {convertToCurrency(value)}
          </p>
        </div>
      </div>
    </div>
  )
}