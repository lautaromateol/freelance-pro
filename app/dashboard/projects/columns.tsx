import { InferResponseType } from "hono"
import { format } from "date-fns"
import { ColumnDef } from "@tanstack/react-table"
import { ProjectDropdown } from "@/features/projects/components/project-dropdown"
import { ClientCell } from "@/features/clients/components/client-cell"
import { client } from "@/lib/client"
import { convertToCurrency } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

type ResponseType = InferResponseType<typeof client.api.projects.$get, 200>["data"][0]

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
    accessorKey: "releaseDate",
    header: "Release Date",
    cell: ({ row }) => {
      const date = row.getValue("releaseDate") as Date
      const formatted = date ? format(date, "PPP") : "Undefined"

      return <p>{formatted}</p>
    }
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => {
      const budgetUnformatted = row.getValue("budget") as number
      const budget = convertToCurrency(budgetUnformatted)

      return (
        <Badge variant="default">
          {budget}
        </Badge>
      )
    }
  },
  {
    accessorKey: "clientId",
    header: "Client",
    cell: ({ row }) => {
      const clientId = row.getValue("clientId") as string
      const project = row.original
      const client = project.client

      return (
        <ClientCell id={clientId ?? ""} name={client ? client.name : ""} />
      )

    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original

      return (
        <ProjectDropdown id={project.id} />
      )
    }
  },
]
