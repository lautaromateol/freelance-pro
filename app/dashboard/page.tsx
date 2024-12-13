"use client"
import { DataGrid } from "@/features/dashboard/components/data-grid"
import { DataCharts } from "@/features/dashboard/components/data-charts"

export default function DashboardPage() {

  return (
    <div className="space-y-8">
      <DataGrid />
      <DataCharts />
    </div>
  )

}
