import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { FaArrowTrendDown, FaArrowTrendUp, FaMoneyBill } from "react-icons/fa6"
import { formatDateRange } from "@/lib/utils"
import { DataCard } from "@/features/dashboard/components/data-card"
import { useGetSummary } from "@/features/dashboard/api/use-get-summary"
import { Skeleton } from "@/components/ui/skeleton"

export function DataGrid() {

  const { data, isLoading } = useGetSummary()

  const params = useSearchParams()
  const to = params.get("to") || undefined
  const from = params.get("from") || undefined

  const dateRangeLabel = useMemo(() => formatDateRange({ to, from }), [from, to])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <DataCard
        title="Income"
        amount={data?.income}
        percentageChange={data?.incomeChange}
        icon={FaArrowTrendUp}
        dateRange={dateRangeLabel}
        variant="success"
      />
       <DataCard
        title="Expenses"
        amount={data?.expenses}
        percentageChange={data?.expensesChange}
        icon={FaArrowTrendDown}
        dateRange={dateRangeLabel}
        variant="danger"
      />
       <DataCard
        title="Remaining"
        amount={data?.remaining}
        percentageChange={data?.remainingChange}
        icon={FaMoneyBill}
        dateRange={dateRangeLabel}
      />
    </div>
  )
}
