"use client"
import { Loader2, PlusIcon } from "lucide-react";
import { useNewClient } from "@/features/clients/hooks/use-new-client";
import { useGetClients } from "@/features/clients/api/use-get-clients";
import { useDeleteClients } from "@/features/clients/api/use-delete-clients";
import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export default function ClientsPage() {

  const [confirm, ConfirmDialog] = useConfirm("Are you sure?", "You are going to delete all your projects.")

  const { onOpen } = useNewClient()
  const clientsQuery = useGetClients()
  const clients = clientsQuery.data || []

  const { deleteClients, isPending } = useDeleteClients()

  if (clientsQuery.isPending) {
    return (
      <div className="max-w-screen-2xl mx-auto">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Your clients</CardTitle>
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
          <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-center justify-between">
            <CardTitle>Your clients</CardTitle>
            <Button
              className="flex items-center"
              size="sm"
              variant="outline"
              onClick={onOpen}
            >
              <p className="text-sm font-medium">
                Add Client
              </p>
              <PlusIcon className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={clients}
            filterKey="name"
            columns={columns}
            onDelete={async (rows, setRowsSelected) => {
              const ok = await confirm()

              if (ok) {
                const ids = rows.map((row) => row.original.id)
                deleteClients({ ids }, {
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
