"use client"
import { useState } from "react";
import { z } from "zod";
import { Loader2, PlusIcon } from "lucide-react";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useDeleteTransactions } from "@/features/transactions/api/use-delete-transactions";
import { useCreateTransactions } from "@/features/transactions/api/use-create-transactions";
import { useConfirm } from "@/hooks/use-confirm";
import { useSelectAccount } from "@/hooks/use-select-account";
import { transactionApiSchema } from "@/schemas/transactions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";

enum VARIANTS {
  IMPORT = "IMPORT",
  LIST = "LIST"
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: []
}

export default function TransactionsPage() {

  const [confirm, ConfirmDialog] = useConfirm("Are you sure?", "You are going to delete all your transactions.")
  const [confirmAccount, ConfirmAccountDialog] = useSelectAccount()

  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
  const [importResults, setImportResults] = useState<typeof INITIAL_IMPORT_RESULTS>(INITIAL_IMPORT_RESULTS)

  const { onOpen } = useNewTransaction()
  const transactionsQuery = useGetTransactions()
  const transactions = transactionsQuery.data || []

  const { createTransactions, isPending: isCreatingTransactions } = useCreateTransactions()
  const { deleteTransactions, isPending: isDeletingTransactions } = useDeleteTransactions()

  const isPending = isCreatingTransactions || isDeletingTransactions

  function onUpload(data: typeof INITIAL_IMPORT_RESULTS) {
    setImportResults(data)
    setVariant(VARIANTS.IMPORT)
  }

  function onCancel() {
    setImportResults(INITIAL_IMPORT_RESULTS)
    setVariant(VARIANTS.LIST)
  }

  async function onSubmit(data: Omit<z.infer<typeof transactionApiSchema>, "accountId">[]) {

    const accountId = await confirmAccount() as string

    const transactions = data.map((item) => ({
      ...item,
      accountId
    }))

    createTransactions({ transactions }, {
      onSuccess: () => onCancel()
    })
  }

  if (transactionsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Your transactions</CardTitle>
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

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <ConfirmAccountDialog />
        <ImportCard onCancel={onCancel} onSubmit={onSubmit} data={importResults.data} />
      </>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto">
      <ConfirmDialog />
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-center justify-between">
            <CardTitle>Your transactions</CardTitle>
            <div className="flex items-center flex-col lg:flex-row gap-2">
              <Button
                className="flex items-center"
                size="sm"
                variant="outline"
                onClick={onOpen}
              >
                <p className="text-sm font-medium">
                  Add Transaction
                </p>
                <PlusIcon className="size-4" />
              </Button>
              <UploadButton onUpload={onUpload} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={transactions}
            filterKey="payee"
            columns={columns}
            onDelete={async (rows, setRowsSelected) => {
              const ok = await confirm()
              if (ok) {
                const ids = rows.map((row) => row.original.id)
                deleteTransactions({ ids }, {
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
