import { InferResponseType } from "hono"
import { format } from "date-fns"
import { ColumnDef } from "@tanstack/react-table"
import { TransactionDropdown } from "@/features/transactions/components/transaction-dropdown"
import { CategoryCell } from "@/features/categories/components/category-cell"
import { AccountCell } from "@/features/accounts/components/account-cell"
import { client } from "@/lib/client"
import { convertToCurrency } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

type ResponseType = InferResponseType<typeof client.api.projects[":id"]["$get"], 200>["data"]["Transaction"][0]

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
      const amountUnformatted = row.getValue("amount") as number
      const amount = convertToCurrency(amountUnformatted)

      return (
        <Badge variant={
          amountUnformatted > 0 ? "primary" : "destructive"
        }>
          {amount}
        </Badge>
      )
    }
  },
  {
    accessorKey: "categoryId",
    header: "Category",
    cell: ({ row }) => {
      const categoryId = row.getValue("categoryId") as string
      const transaction = row.original
      const category = transaction.category

      return (
        <CategoryCell id={categoryId ?? ""} name={category ? category.name : ""} />
      )

    }
  },
  {
    accessorKey: "accountId",
    header: "Account",
    cell: ({ row }) => {
      const accountId = row.getValue("accountId") as string
      const transaction = row.original
      const name = transaction.account.name

      return (
        <AccountCell id={accountId} name={name} />
      )
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
