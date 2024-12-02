import { useState } from "react"
import { InferResponseType } from "hono"
import { Text, Wallet } from "lucide-react"
import { client } from "@/lib/client"
import { useDeleteTransactions } from "@/features/transactions/api/use-delete-transactions"
import { useEditProject } from "@/features/projects/api/use-edit-project"
import { DataTable } from "@/components/data-table"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { columns } from "./project-transactions-columns"
import { convertAmountToMilliunits } from "@/lib/utils"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Status } from "@prisma/client/edge"

type Project = InferResponseType<typeof client.api.projects[":id"]["$get"], 200>["data"]

type Props = {
  project: Project
}

export function ProjectDetail({ project }: Props) {

  const { deleteTransactions, isPending: isDeletingTransactions } = useDeleteTransactions()

  const [notes, setNotes] = useState(project.notes ?? "")
  const [status, setStatus] = useState(project.status)

  const transactions = project.Transaction ?? []

  const { editProject, isPending: isEditingProject } = useEditProject(project?.id)

  const isPending = isDeletingTransactions || isEditingProject

  function updateNotes() {
    editProject({
      budget: convertAmountToMilliunits(project.budget),
      name: project.name,
      releaseDate: project.releaseDate ? new Date(project.releaseDate) : null,
      clientId: project.clientId,
      status: project.status,
      notes
    })
  }

  function onStatusChange(value: Status) {
    const previousStatus = status
    setStatus(value)
    editProject({
      budget: convertAmountToMilliunits(project.budget),
      name: project.name,
      releaseDate: project.releaseDate ? new Date(project.releaseDate) : null,
      clientId: project.clientId,
      notes: project.notes,
      status: value
    }, {
      onError: () => setStatus(previousStatus)
    })
  }


  if (!project) return null

  return (
    <div className="space-y-6">
      <div className="w-1/5">
        <Select onValueChange={onStatusChange} defaultValue={status}>
          <SelectTrigger>
            <SelectValue>
              {status === "IN_PROGRESS" ? "In Progress" : "Complete"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={Status.IN_PROGRESS}>
                In Progress
              </SelectItem>
              <SelectItem value={Status.COMPLETE}>
                Complete
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <div className="flex items-center">
          <Text className="size-6 text-gray-500 mr-2" />
          <p className="font-semibold text-gray-900/90">Notes</p>
        </div>
        <div className="flex flex-col gap-y-1.5">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add some notes..."
          />
          <div className="flex items-center gap-x-2">
            <Button
              variant="outline"
              onClick={() => setNotes(project.notes ?? "")}
              disabled={isPending || notes === project.notes}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              onClick={updateNotes}
              disabled={isPending || notes === project.notes}
              size="sm"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center">
          <Wallet className="size-6 text-gray-500 mr-2" />
          <p className="font-semibold text-gray-900/90">Transactions</p>
        </div>
        <DataTable
          data={transactions}
          filterKey="payee"
          columns={columns}
          onDelete={(rows, setRowsSelected) => {
            const ids = rows.map((row) => row.original.id)
            deleteTransactions({ ids }, {
              onSuccess: () => setRowsSelected({})
            })
          }}
          disabled={isPending}
        />
      </div>
    </div>
  )
}
