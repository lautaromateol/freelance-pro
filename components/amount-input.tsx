/* eslint-disable @typescript-eslint/no-explicit-any */
import CurrencyInput from 'react-currency-input-field';
import { Info, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from './ui/button';

type Props = {
  onChange?: (...event: any[]) => void
  value: string
  disabled: boolean
}

export function AmountInput({ onChange, value, disabled }: Props) {

  const parsedValue = parseFloat(value)
  const isPositive = parsedValue > 0
  const isNegative = parsedValue < 0

  function onValueReverse() {
    if (!value) return
    onChange?.((parsedValue * -1).toString())
  }

  return (
    <div className="relative w-full">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              className={cn(
                "absolute inset-y-2 left-2 bg-gray-500 hover:bg-gray-500",
                isPositive && "bg-emerald-500 hover:bg-emerald-500",
                isNegative && "bg-rose-500 hover:bg-red-500"
              )}
              onClick={onValueReverse}
            >
              {isPositive ? <Plus className="text-white size-2" /> : isNegative ? <Minus className="text-white size-2" /> : <Info className="text-white size-2" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Use [+] or [-] to reverse your amount value.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CurrencyInput
        prefix="$"
        onValueChange={onChange}
        value={value}
        decimalsLimit={2}
        decimalScale={2}
        disabled={disabled}
        className="flex h-10 w-full rounded-md border border-input bg-background pl-10 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
      />
      {parsedValue ? (
        <p className="text-xs text-black/90 mt-2">This will count as an {isPositive ? "income" : "expense"}</p>
      ) : null}
    </div>
  )
}
