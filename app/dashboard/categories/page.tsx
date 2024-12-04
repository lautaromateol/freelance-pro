"use client"
import { Loader2, PlusIcon } from "lucide-react";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useDeleteCategories } from "@/features/categories/api/use-delete-categories";
import { useConfirm } from "@/hooks/use-confirm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export default function CategoriesPage() {

  const [confirm, ConfirmDialog] = useConfirm("Are you sure?", "You are going to delete all your categories.")

  const { onOpen } = useNewCategory()
  const categoriesQuery = useGetCategories()
  const categories = categoriesQuery.data || []

  const { deleteCategories, isPending } = useDeleteCategories()

  if (categoriesQuery.isPending) {
    return (
      <div className="max-w-screen-2xl mx-auto">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Your categories</CardTitle>
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
            <CardTitle>Your categories</CardTitle>
            <Button
              className="flex items-center"
              size="sm"
              variant="outline"
              onClick={onOpen}
            >
              <p className="text-sm font-medium">
                Add Category
              </p>
              <PlusIcon className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={categories}
            filterKey="name"
            columns={columns}
            onDelete={async (rows, setRowsSelected) => {
              const ok = await confirm()

              if (ok) {
                const ids = rows.map((row) => row.original.id)
                deleteCategories({ ids }, {
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
