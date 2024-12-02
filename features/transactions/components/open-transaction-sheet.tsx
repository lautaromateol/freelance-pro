"use client"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction"
import { useEditTransaction } from "@/features/transactions/api/use-edit-transaction"
import { useGetTransaction } from "@/features/transactions/api/use-get-transaction"
import { useDeleteTransaction } from "@/features/transactions/api/use-delete-transaction"
import { useGetCategories } from "@/features/categories/api/use-get-categories"
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts"
import { useCreateCategory } from "@/features/categories/api/use-create-category"
import { useCreateAccount } from "@/features/accounts/api/use-create-account"
import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { transactionSchema } from "@/schemas/transactions"
import { convertAmountToMilliunits } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { TransactionForm } from "./transaction-form"

type FormValues = z.input<typeof transactionSchema>

export function OpenTransactionSheet() {

  const { isOpen, onClose, id } = useOpenTransaction()

  const transactionQuery = useGetTransaction(id)
  const transaction = transactionQuery.data
  const { editTransaction, isPending: isEditingTransaction } = useEditTransaction(id)
  const { deleteTransaction, isPending: isDeletingTransaction } = useDeleteTransaction(id)

  const defaultValues = transaction ?
    { ...transaction, amount: transaction.amount.toString(), date: new Date(transaction.date) }
    : undefined

  function onSubmit(json: FormValues) {

    const payload = {
      ...json,
      amount: convertAmountToMilliunits(parseFloat(json.amount.replace(",", ".")))
    }

    editTransaction(payload, {
      onSuccess: () => onClose()
    })
  }

  function onDelete() {
    deleteTransaction(undefined, {
      onSuccess: () => onClose()
    })
  }

  const categoriesQuery = useGetCategories()
  const { createCategory, isPending: isCreatingCategory } = useCreateCategory()
  const categories = categoriesQuery.data || []

  const accountsQuery = useGetAccounts()
  const { createAccount, isPending: isCreatingAccount } = useCreateAccount()
  const accounts = accountsQuery.data || []

  const projectsQuery = useGetProjects()
  const projects = projectsQuery.data || []

  const isLoading = categoriesQuery.isLoading || accountsQuery.isLoading || projectsQuery.isLoading || transactionQuery.isLoading

  const isPending = isCreatingCategory || isCreatingAccount || isEditingTransaction || isDeletingTransaction

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

  const projectsOptions = projects.length > 0 ?
    projects.map((item) => ({
      label: item.name,
      value: item.id
    })) : undefined


  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit transaction</SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        )
          :
          (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
              categoriesOptions={categoriesOptions}
              onCreateCategory={onCreateCategory}
              accountsOptions={accountsOptions}
              onCreateAccount={onCreateAccount}
              projectsOptions={projectsOptions}
              disabled={isPending}
            />
          )}
      </SheetContent>
    </Sheet>
  )
}
