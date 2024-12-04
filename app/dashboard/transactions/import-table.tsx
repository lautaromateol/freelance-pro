/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { TableHeadSelect } from "./table-head-select"

type Props = {
  headers: string[],
  body: string[][],
  requiredOptions: string[],
  onChange: (columnIndex: number, value: string) => void,
  selectedColumns: { [key: string]: string | null }
}

export function ImportTable({ headers, body, requiredOptions, onChange, selectedColumns }: Props) {


  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((_, index) => (
            <TableHeadSelect
              index={index}
              requiredOptions={requiredOptions}
              onChange={onChange}
              selectedColumns={selectedColumns}
              key={index} />
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {body.map((cell, index) => (
          <TableRow key={index}>
            {cell.map((item, index) => (
              <TableCell key={index}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}