"use client"
import { z } from "zod"
import { useOpenClient } from "@/features/clients/hooks/use-open-client"
import { ClientForm } from "@/features/clients/components/client-form"
import { useGetClient } from "@/features/clients/api/use-get-client"
import { useEditClient } from "@/features/clients/api/use-edit-client"
import { useDeleteClient } from "@/features/clients/api/use-delete-client"
import { clientSchema } from "@/schemas/client"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"

type FormValues = z.input<typeof clientSchema>

export function OpenClientSheet() {

  const { id, isOpen, onClose } = useOpenClient()

  const clientQuery = useGetClient(id)

  const { updateClient, isPending: isEditing } = useEditClient(id)
  const { deleteClient, isPending: isDeleting } = useDeleteClient(id)

  const client = clientQuery.data

  const isPending = isEditing || isDeleting

  function onSubmit(json: FormValues) {
    updateClient(json, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  function onDelete() {
    deleteClient(undefined, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const defaultValues = clientQuery.data ? { name: clientQuery.data.name } : { name: "" }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update client</SheetTitle>
        </SheetHeader>
        {clientQuery.isLoading ? (
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <ClientForm id={client?.id} defaultValues={defaultValues} disabled={isPending} onSubmit={onSubmit} onDelete={onDelete} />
        )}
      </SheetContent>
    </Sheet>
  )
}
