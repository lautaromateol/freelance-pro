"use client"
import { z } from "zod"
import { useNewClient } from "@/features/clients/hooks/use-new-client"
import { ClientForm } from "./client-form"
import { useCreateClient } from "@/features/clients/api/use-create-client"
import { clientSchema } from "@/schemas/client"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

type FormValues = z.input<typeof clientSchema>

export function NewClientSheet() {

  const { isOpen, onClose } = useNewClient()
  const { createClient, isPending } = useCreateClient()

  function onSubmit(json: FormValues) {
    createClient(json, {
      onSuccess: () => onClose()
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new client</SheetTitle>
        </SheetHeader>
        <ClientForm onSubmit={onSubmit} disabled={isPending} />
      </SheetContent>
    </Sheet>
  )
}
