"use client"
import { Loader2, PlusIcon } from "lucide-react";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useDeleteAccounts } from "@/features/accounts/api/use-delete-accounts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export default function AccountsPage() {

  const { onOpen } = useNewAccount()
  const accountsQuery = useGetAccounts()
  const accounts = accountsQuery.data || []

  const { deleteAccounts, isPending } = useDeleteAccounts()

  if (accountsQuery.isPending) {
    return (
      <div className="max-w-screen-2xl mx-auto">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Your accounts</CardTitle>
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
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-y-1 lg:gap-y-0 items-center justify-between">
            <CardTitle>Your accounts</CardTitle>
            <Button
              className="flex items-center"
              size="sm"
              variant="outline"
              onClick={onOpen}
            >
              <p className="text-sm font-medium">
                Add Account
              </p>
              <PlusIcon className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={accounts}
            filterKey="name"
            columns={columns}
            onDelete={(rows, setRowsSelected) => {
              const ids = rows.map((row) => row.original.id)
              deleteAccounts({ ids })
              setRowsSelected({})
            }}
            disabled={isPending}
          />
        </CardContent>
      </Card>
    </div>
  )
}
