/* eslint-disable @typescript-eslint/no-unused-vars */
import { InferResponseType } from "hono"
import { format } from "date-fns"
import { ColumnDef } from "@tanstack/react-table"
import { ClientDropdown } from "@/features/clients/components/client-dropdown"
import { TransactionDropdown } from "@/features/transactions/components/transaction-dropdown"
import { client } from "@/lib/client"
import { convertToCurrency } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

type ResponseType = InferResponseType<typeof client.api.transactions.$get, 200>["data"][0]

export const columns: ColumnDef<ResponseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = format(row.getValue("date"), "PPP")

      return <p>{date}</p>
    }
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = convertToCurrency(row.getValue("amount"))

      return <p>{amount}</p>
    }
  },
  {
    accessorKey: "payee",
    header: "Payee"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original

      return (
        <TransactionDropdown id={transaction.id} />
      )
    }
  },
]
