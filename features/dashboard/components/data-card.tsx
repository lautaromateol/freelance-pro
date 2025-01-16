import Countup from "react-countup"
import { cva, VariantProps } from "class-variance-authority"
import { IconType } from "react-icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn, convertToCurrency, formatPercentage } from "@/lib/utils"

const boxVariant = cva(
  "rounded-md p-3",
  {
    variants: {
      variant: {
        default: "bg-blue-500/20",
        success: "bg-emerald-500/20",
        danger: "bg-rose-500/20"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const iconVariant = cva(
  "size-6",
  {
    variants: {
      variant: {
        default: "fill-blue-500",
        success: "fill-emerald-500",
        danger: "fill-rose-500"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

type BoxVariant = VariantProps<typeof boxVariant>
type IconVariant = VariantProps<typeof iconVariant>

interface DataProps extends BoxVariant, IconVariant {
  title: string,
  amount?: number,
  percentageChange?: number,
  dateRange: string,
  icon: IconType
}

export function DataCard({ title, amount, percentageChange, dateRange, icon: Icon, variant }: DataProps) {
  return (
    <Card className="shadow-md border-none">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{dateRange}</CardDescription>
        </div>
        <div className={cn(boxVariant({ variant }))}>
          <Icon className={cn(iconVariant({ variant }))} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="font-bold text-xl">
          <Countup
            preserveValue
            decimals={2}
            decimalPlaces={2}
            start={0}
            end={amount ?? 0}
            formattingFn={convertToCurrency}
          />
        </p>
        {percentageChange ? (
          <p className={cn(
            "texts-sm",
            percentageChange > 0 ? "text-emerald-500" :
              percentageChange < 0 ? "text-rose-500" :
                "text-muted-foreground"
          )}>
            {formatPercentage(percentageChange, { addPrefix: percentageChange > 0 })} from last period.
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}
