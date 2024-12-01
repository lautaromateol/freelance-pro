"use client"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { useOpenProject } from "@/features/projects/hooks/use-open-project"
import { useEditProject } from "@/features/projects/api/use-edit-project"
import { useGetProject } from "@/features/projects/api/use-get-project"
import { useDeleteProject } from "@/features/projects/api/use-delete-project"
import { useGetClients } from "@/features/clients/api/use-get-clients"
import { useCreateClient } from "@/features/clients/api/use-create-client"
import { ProjectForm } from "@/features/projects/components/project-form"
import { projectSchema } from "@/schemas/project"
import { convertAmountToMilliunits } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

type FormValues = z.input<typeof projectSchema>

export function OpenProjectSheet() {

  const { isOpen, onClose, id } = useOpenProject()

  const projectQuery = useGetProject(id)
  const project = projectQuery.data
  const { editProject, isPending: isEditingProject } = useEditProject(id)
  const { deleteProject, isPending: isDeletingProject } = useDeleteProject(id)

  const defaultValues = project ?
    { ...project, budget: project.budget.toString(), releaseDate: project.releaseDate ? new Date(project.releaseDate) : new Date() }
    : undefined

  function onSubmit(json: FormValues) {

    const payload = {
      ...json,
      budget: convertAmountToMilliunits(parseFloat(json.budget.replace(",", ".")))
    }

    editProject(payload, {
      onSuccess: () => onClose()
    })
  }

  function onDelete() {
    deleteProject(undefined, {
      onSuccess: () => onClose()
    })
  }

  const clientsQuery = useGetClients()
  const { createClient, isPending: isCreatingClient } = useCreateClient()
  const clients = clientsQuery.data || []

  const isLoading = clientsQuery.isLoading

  const isPending = isCreatingClient || isEditingProject || isDeletingProject

  const clientsOptions = clients.length > 0 ?
    clients.map((item) => ({
      label: item.name,
      value: item.id
    })) : undefined

  function onCreateClient(name: string) {
    createClient({ name })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit project</SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        )
          :
          (
            <ProjectForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
              clientsOptions={clientsOptions}
              onCreateClient={onCreateClient}
              disabled={isPending}
            />
          )}
      </SheetContent>
    </Sheet>
  )
}
