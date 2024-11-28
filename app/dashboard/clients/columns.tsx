/* eslint-disable @typescript-eslint/no-unused-vars */
import { InferResponseType } from "hono"
import { ColumnDef } from "@tanstack/react-table"
import { ClientDropdown } from "@/features/clients/components/client-dropdown"
import { client } from "@/lib/client"
import { Checkbox } from "@/components/ui/checkbox"

type ResponseType = InferResponseType<typeof client.api.clients.$get, 200>["data"][0]

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
    accessorKey: "name",
    header: "Name"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const account = row.original

      return (
        <ClientDropdown id={account.id} />
      )
    }
  }
]
