import { createContext, useContext, useState } from "react"
import { InferResponseType } from "hono"
import { isAfter, isEqual } from "date-fns"
import { Clock, CreditCard, ListChecks, PieChart } from "lucide-react"
import { useDeleteTransactions } from "@/features/transactions/api/use-delete-transactions"
import { useEditProject } from "@/features/projects/api/use-edit-project"
import { client } from "@/lib/client"
import { convertAmountFromMilliunits, convertAmountToMilliunits } from "@/lib/utils"
import { DataTable } from "@/components/data-table"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/date-picker"
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { columns } from "./project-transactions-columns"
import { BudgetComparisonChart } from "./budget-spent-comparison-chart"
import { ListsContainer } from "./lists-container"

type Project = InferResponseType<typeof client.api.projects[":id"]["$get"], 200>["data"]

type Props = {
  project: Project
  children: React.ReactNode
}

type ProjectContextType = {
  project: Project
  deleteTransactions: ReturnType<typeof useDeleteTransactions>["deleteTransactions"]
  editProject: ReturnType<typeof useEditProject>["editProject"]
  notes: string
  setNotes: React.Dispatch<React.SetStateAction<string>>
  releaseDate: Date | undefined
  setReleaseDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  transactions: Project["Transaction"]
  lists: Project["List"],
  isPending: boolean
  updateDate: () => void
  updateNotes: () => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectDetail({ project, children }: Props) {

  const { deleteTransactions, isPending: isDeletingTransactions } = useDeleteTransactions()
  const { editProject, isPending: isEditingProject } = useEditProject(project?.id)

  const [notes, setNotes] = useState(project.notes ?? "")
  const [releaseDate, setReleaseDate] = useState(project.releaseDate ? new Date(project.releaseDate) : undefined)

  const transactions = project.Transaction ?? []
  const lists = project.List ?? []
  const isPending = isDeletingTransactions || isEditingProject

  function updateNotes() {
    editProject({
      budget: convertAmountToMilliunits(project.budget),
      name: project.name,
      releaseDate: project.releaseDate ? new Date(project.releaseDate) : null,
      clientId: project.clientId,
      notes
    },
      {
        onError: () => setNotes(project.notes ?? "")
      })
  }

  function updateDate() {
    editProject({
      budget: convertAmountToMilliunits(project.budget),
      name: project.name,
      clientId: project.clientId,
      notes: project.notes,
      releaseDate,
    }, {
      onError: () => setReleaseDate(project.releaseDate ? new Date(project.releaseDate) : undefined)
    })
  }

  return (
    <ProjectContext.Provider value={{ project, deleteTransactions, editProject, notes, setNotes, releaseDate, setReleaseDate, transactions, lists, isPending, updateDate, updateNotes }}>
      {children}
    </ProjectContext.Provider>
  )
}

function Content() {
  const {
    project,
    deleteTransactions,
    notes,
    setNotes,
    releaseDate,
    setReleaseDate,
    transactions,
    lists,
    isPending,
    updateDate,
    updateNotes,
  } = useProjectContext()

  const budget = project.budget
  const spent = convertAmountFromMilliunits(transactions.filter((item) => item.amount < 0).reduce((acc, item) => item.amount + acc, 0)) * -1

  return (
    <div className="space-y-6 overflow-hidden">
      <div className="w-1/2 lg:w-1/5 space-y-2">
        <div className="flex items-center gap-2">
          <Clock className="size-5 text-muted-foreground" />
          <h3 className="font-semibold">Release Date</h3>
        </div>
        <DatePicker
          date={releaseDate}
          onChange={setReleaseDate}
          disabled={isPending}
        />
        {(((project.releaseDate && releaseDate) && (!isEqual(releaseDate, new Date(project.releaseDate))))
          || (!project.releaseDate && releaseDate)) && (
            <div className="flex items-center gap-x-2">
              <Button
                variant="outline"
                onClick={() => setReleaseDate(project.releaseDate ? new Date(project.releaseDate) : undefined)}
                disabled={isPending}
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={updateDate}
                disabled={isPending}
                size="sm"
              >
                Save
              </Button>
            </div>
          )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-6 lg:gap-y-0 lg:gap-x-6">
        <div className="space-y-2 col-span-1 lg:col-span-3">
          <div className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Notes</h3>
          </div>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add some notes..."
            className="min-h-[100px] lg:min-h-[200px] w-3/4 lg:w-full"
          />
          {notes !== project.notes && (
            <div className="flex items-center gap-x-2">
              <Button
                variant="outline"
                onClick={() => setNotes(project.notes ?? "")}
                disabled={isPending}
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={updateNotes}
                disabled={isPending}
                size="sm"
              >
                Save
              </Button>
            </div>
          )}
        </div>
        <div className="space-y-2 lg:self-center lg:place-self-center">
          <div className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Budget vs Spent</h3>
          </div>
          <BudgetComparisonChart budget={budget} spent={spent} />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Transactions</h3>
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
      <ListsContainer projectId={project.id} lists={lists} />
    </div>
  )
}

function Header() {

  const { project } = useProjectContext()

  return (
    <DialogHeader>
      <div className="flex flex-col gap-y-2 lg:gap-y-0 lg:flex-row items-start lg:items-center lg:justify-between">
        <div className="space-y-0.5">
          <DialogTitle className="text-2xl text-left">{project.name}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            belongs to <span className="underline">{project.client.name}</span>
          </DialogDescription>
        </div>
        <Badge
          variant={!project.releaseDate ? "primary" : isAfter(new Date(), project.releaseDate) ? "destructive" : "primary"}
          className="capitalize w-auto"
        >
          {!project.releaseDate ? "On time" : isAfter(new Date(), project.releaseDate) ? "Out of time" : "On time"}
        </Badge>
      </div>
    </DialogHeader>
  )
}

function useProjectContext() {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error("useProjectContext must be used inside ProjectDetail.")
  }
  return context
}

ProjectDetail.Content = Content
ProjectDetail.Header = Header