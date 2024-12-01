"use client"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { useCreateProject } from "@/features/projects/api/use-create-project"
import { useGetClients } from "@/features/clients/api/use-get-clients"
import { useCreateClient } from "@/features/clients/api/use-create-client"
import { projectSchema } from "@/schemas/project"
import { convertAmountToMilliunits } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ProjectForm } from "./project-form"

type FormValues = z.input<typeof projectSchema>

export function NewProjectSheet() {

  const { isOpen, onClose } = useNewTransaction()
  const { createProject, isPending: isCreatingProject } = useCreateProject()

  function onSubmit(json: FormValues) {

    const payload = {
      ...json,
      budget: convertAmountToMilliunits(parseFloat(json.budget.replace(",", ".")))
    }

    createProject(payload, {
      onSuccess: () => onClose()
    })
  }

  const clientsQuery = useGetClients()
  const { createClient, isPending: isCreatingClient } = useCreateClient()
  const clients = clientsQuery.data || []

  const isLoading = clientsQuery.isLoading

  const isPending = isCreatingClient || isCreatingProject

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
          <SheetTitle>Create new project</SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        )
          :
          (
            <ProjectForm
              onSubmit={onSubmit}
              clientsOptions={clientsOptions}
              onCreateClient={onCreateClient}
              disabled={isPending}
            />
          )}
      </SheetContent>
    </Sheet>
  )
}
