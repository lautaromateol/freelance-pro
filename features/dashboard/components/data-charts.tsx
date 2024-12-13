import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { formatDateRange } from "@/lib/utils"
import { useGetSummary } from "@/features/dashboard/api/use-get-summary"
import { TransactionsChart } from "@/features/dashboard/components/transactions-chart"
import { SpendingChart } from "@/features/dashboard/components/spending-chart"
import { Skeleton } from "@/components/ui/skeleton"

export function DataCharts() {

  const params = useSearchParams()
  const to = params.get("to") || undefined
  const from = params.get("from") || undefined

  const dateRangeLabel = useMemo(() => formatDateRange({ to, from }), [from, to])

  const { data, isLoading } = useGetSummary()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <Skeleton className="h-96 w-full" />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <TransactionsChart data={data?.days} dateRange={dateRangeLabel} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingChart data={data?.categoriesExpenses} dateRange={dateRangeLabel} />
      </div>
    </div>
  )
}
