"use client"
import { z } from "zod"
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account"
import { AccountForm } from "@/features/accounts/components/account-form"
import { useGetAccount } from "@/features/accounts/api/use-get-account"
import { useEditAccount } from "@/features/accounts/api/use-edit-account"
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account"
import { accountSchema } from "@/schemas/account"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"

type FormValues = z.input<typeof accountSchema>

export function OpenAccountSheet() {

  const { id, isOpen, onClose } = useOpenAccount()

  const accountQuery = useGetAccount(id)

  const { updateAccount, isPending: isEditing } = useEditAccount(id)
  const { deleteAccount, isPending: isDeleting } = useDeleteAccount(id)

  const account = accountQuery.data

  const isPending = isEditing || isDeleting

  function onSubmit(json: FormValues) {
    updateAccount(json, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  function onDelete() {
    deleteAccount(undefined, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new account</SheetTitle>
        </SheetHeader>
        {accountQuery.isLoading ? (
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <AccountForm id={account?.id} defaultValues={account} disabled={isPending} onSubmit={onSubmit} onDelete={onDelete} />
        )}
      </SheetContent>
    </Sheet>
  )
}
