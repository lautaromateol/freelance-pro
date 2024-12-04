"use client"
import { Loader2, PlusIcon } from "lucide-react";
import { useNewProject } from "@/features/projects/hooks/use-new-project";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useDeleteProjects } from "@/features/projects/api/use-delete-projects";
import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export default function ProjectsPage() {

  const [confirm, ConfirmDialog] = useConfirm("Are you sure?", "You are going to delete all your projects.")

  const { onOpen } = useNewProject()
  const projectsQuery = useGetProjects()
  const projects = projectsQuery.data || []

  const { deleteProjects, isPending } = useDeleteProjects()

  if (projectsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Your projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto">
      <ConfirmDialog />
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-y-1 lg:gap-y-0 items-center justify-between">
            <CardTitle>Your projects</CardTitle>
            <Button
              className="flex items-center"
              size="sm"
              variant="outline"
              onClick={onOpen}
            >
              <p className="text-sm font-medium">
                Add Project
              </p>
              <PlusIcon className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={projects}
            filterKey="name"
            columns={columns}
            onDelete={async (rows, setRowsSelected) => {
              const ok = await confirm()

              if (ok) {
                const ids = rows.map((row) => row.original.id)
                deleteProjects({ ids }, {
                  onSuccess: () => setRowsSelected({})
                })
              }
            }}
            disabled={isPending}
          />
        </CardContent>
      </Card>
    </div>
  )
}
