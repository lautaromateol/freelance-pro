/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImportTable } from "./import-table"
import { convertAmountToMilliunits } from "@/lib/utils"
import { format, parse } from "date-fns"

type Props = {
  data: string[][]
  onCancel: () => void
  onSubmit: (data: any) => void
}

const dateFormat = "yyyy-MM-dd HH:mm:ss"
const outputFormat = "yyyy-MM-dd"

const requiredOptions = ["amount", "date", "payee"]

type SelectedColumnsState = {
  [key: string]: string | null
}

export function ImportCard({ onCancel, onSubmit, data }: Props) {

  const headers = data[0]
  const body = data.slice(1)

  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>({})

  const progress = Object.values(selectedColumns).filter(Boolean).length

  function handleSelectColumnsChange(columnIndex: number, value: string) {
    setSelectedColumns((prev) => {

      const newState = { ...prev }

      for (const key in newState) {
        if (newState[key] === value) {
          newState[key] = null
        }
      }
      newState[`column_${columnIndex}`] = value === "skip" ? null : value

      return newState
    })
  }

  function handleContinue() {
    const mappedData = {
      headers: headers.map((_header, index) => {
        return selectedColumns[`column_${index}`] || null
      }),
      body: body.map((cell) => {
        const formattedRow = cell.map((cell, index) => {
          return selectedColumns[`column_${index}`] ? cell : null
        })
        
        return formattedRow.every((item) => item === null) ? [] : formattedRow
      }).filter((item) => item.length > 0)
    }
    
    const arrayOfData = mappedData.body.map((row) => {
      return row.reduce((acc: any, item, index) => {
        const header = mappedData.headers[index]
        if(header) {
          acc[header] = item
        }
        
        return acc
      }, {})
    })

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMilliunits(item.amount),
      date: format(parse(item.date, dateFormat, new Date()), outputFormat)
    }))

    onSubmit(formattedData)
  }

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-center justify-between">
            <CardTitle>Import transactions</CardTitle>
            <div className="flex items-center flex-col lg:flex-row gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={onCancel}
              >
                <p className="text-sm font-medium">
                  Cancel
                </p>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleContinue}
                disabled={progress < requiredOptions.length}
              >
                <p className="text-sm font-medium">
                  Continue ({progress}/{requiredOptions.length})
                </p>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            requiredOptions={requiredOptions}
            onChange={handleSelectColumnsChange}
            selectedColumns={selectedColumns}
          />
        </CardContent>
      </Card>
    </div>
  )
}
