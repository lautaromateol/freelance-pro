"use client"
import qs from "query-string"
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { formatDateRange } from "@/lib/utils";
import { useGetSummary } from "@/features/dashboard/api/use-get-summary";
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

export function DateFilter() {

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const accountId = searchParams.get("accountId")

  const defaultTo = new Date()
  const defaultFrom = subDays(defaultTo, 30)

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo
  }

  const [date, setDate] = useState<DateRange | undefined>(paramState)

  const { isLoading } = useGetSummary()

  function pushToUrl(dateRange?: DateRange) {
    const query = {
      from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
      to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
      accountId
    }

    const url = qs.stringifyUrl({
      url: pathname,
      query
    }, {
      skipNull: true,
      skipEmptyString: true
    })

    router.push(url)
  }

  function onReset() {
    setDate(undefined)
    pushToUrl(undefined)
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={isLoading}
            size="sm"
          >
            <span>{formatDateRange(paramState)}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="lg:w-auto w-full p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className="p-4 w-full flex items-center gap-x-2">
            <PopoverClose asChild>
              <Button
                onClick={onReset}
                disabled={!date?.from || !date?.to}
                className="w-full"
                variant="outline"
              >
                Reset
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button
                onClick={() => pushToUrl(date)}
                disabled={!date?.from || !date?.to}
                className="w-full"
              >
                Apply
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
