"use client"
import { z } from "zod"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { AccountForm } from "@/features/accounts/components/account-form"
import { useCreateAccount } from "@/features/accounts/api/use-create-account"
import { accountSchema } from "@/schemas/account"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

type FormValues = z.input<typeof accountSchema>

export function NewAccountSheet() {

  const { isOpen, onClose } = useNewAccount()
  const { createAccount, isPending } = useCreateAccount()

  function onSubmit(json: FormValues) {
    createAccount(json, {
      onSuccess: () => onClose()
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new account</SheetTitle>
        </SheetHeader>
        <AccountForm onSubmit={onSubmit} disabled={isPending} />
      </SheetContent>
    </Sheet>
  )
}
