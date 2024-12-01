"use client"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction"
import { useCreateTransaction } from "@/features/transactions/api/use-create-transaction"
import { useGetCategories } from "@/features/categories/api/use-get-categories"
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts"
import { useCreateCategory } from "@/features/categories/api/use-create-category"
import { useCreateAccount } from "@/features/accounts/api/use-create-account"
import { transactionSchema } from "@/schemas/transactions"
import { convertAmountToMilliunits } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { TransactionForm } from "./transaction-form"

type FormValues = z.input<typeof transactionSchema>

export function NewTransactionSheet() {

  const { isOpen, onClose } = useNewTransaction()
  const { createTransaction, isPending: isCreatingTransaction } = useCreateTransaction()

  function onSubmit(json: FormValues) {

    const payload = {
      ...json,
      amount: convertAmountToMilliunits(parseFloat(json.amount.replace(",", ".")))
    }

    createTransaction(payload, {
      onSuccess: () => onClose()
    })
  }

  const categoriesQuery = useGetCategories()
  const { createCategory, isPending: isCreatingCategory } = useCreateCategory()
  const categories = categoriesQuery.data || []

  const accountsQuery = useGetAccounts()
  const { createAccount, isPending: isCreatingAccount } = useCreateAccount()
  const accounts = accountsQuery.data || []

  const isLoading = categoriesQuery.isLoading || accountsQuery.isLoading

  const isPending = isCreatingCategory || isCreatingAccount || isCreatingTransaction

  const categoriesOptions = categories.length > 0 ?
    categories.map((item) => ({
      label: item.name,
      value: item.id
    })) : undefined

  function onCreateCategory(name: string) {
    createCategory({ name })
  }

  const accountsOptions = accounts.length > 0 ?
    accounts.map((item) => ({
      label: item.name,
      value: item.id
    })) : undefined

  function onCreateAccount(name: string) {
    createAccount({ name })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create new transaction</SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        )
          :
          (
            <TransactionForm
              onSubmit={onSubmit}
              categoriesOptions={categoriesOptions}
              onCreateCategory={onCreateCategory}
              accountsOptions={accountsOptions}
              onCreateAccount={onCreateAccount}
              disabled={isPending}
            />
          )}
      </SheetContent>
    </Sheet>
  )
}
