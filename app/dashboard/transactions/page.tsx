"use client"
import { Loader2, PlusIcon } from "lucide-react";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useDeleteTransactions } from "@/features/transactions/api/use-delete-transactions";
import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export default function TransactionsPage() {

  const [confirm, ConfirmDialog] = useConfirm("Are you sure?", "You are going to delete all your transactions.")

  const { onOpen } = useNewTransaction()
  const transactionsQuery = useGetTransactions()
  const transactions = transactionsQuery.data || []

  const { deleteTransactions, isPending } = useDeleteTransactions()

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

  return (
    <div className="max-w-screen-2xl mx-auto">
      <ConfirmDialog />
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-y-1 lg:gap-y-0 items-center justify-between">
            <CardTitle>Your transactions</CardTitle>
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
