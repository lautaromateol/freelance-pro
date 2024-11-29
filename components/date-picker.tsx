/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"

type Props = {
  date?: Date
  onChange?: (...event: any[]) => void
  disabled?: boolean
}

export function DatePicker({ date, onChange, disabled }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={cn(
            "flex items-center justify-start w-full text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="size-4 mr-2" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  )
}
