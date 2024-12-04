import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableHead } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type Props = {
  index: number,
  requiredOptions: string[],
  onChange: (columnIndex: number, value: string) => void,
  selectedColumns: { [key: string]: string | null }
}

export function TableHeadSelect({ index, requiredOptions, onChange, selectedColumns }: Props) {

  const currentSelection = selectedColumns[`column_${index}`]

  return (
    <TableHead>
      <Select value={currentSelection || ""} onValueChange={(value) => onChange(index, value)}>
        <SelectTrigger
          className={cn(
            "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
            currentSelection && "text-blue-500"
          )} >
          <SelectValue placeholder="Skip" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="skip">
              Skip
            </SelectItem>
            {requiredOptions.map((option) => {
              const disabled = currentSelection !== option && Object.values(selectedColumns).includes(option)

              return (
                <SelectItem key={option} value={option} disabled={disabled} className="capitalize">
                  {option}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </TableHead>
  )
}
