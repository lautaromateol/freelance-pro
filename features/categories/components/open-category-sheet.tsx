"use client"
import { z } from "zod"
import { useOpenCategory } from "@/features/categories/hooks/use-open-category"
import { CategoryForm } from "@/features/categories/components/category-form"
import { useGetCategory } from "@/features/categories/api/use-get-category"
import { useEditCategory } from "@/features/categories/api/use-edit-category"
import { useDeleteCategory } from "@/features/categories/api/use-delete-category"
import { categorySchema } from "@/schemas/category"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"

type FormValues = z.input<typeof categorySchema>

export function OpenCategorySheet() {

  const { id, isOpen, onClose } = useOpenCategory()

  const categoryQuery = useGetCategory(id)

  const { updateCategory, isPending: isEditing } = useEditCategory(id)
  const { deleteCategory, isPending: isDeleting } = useDeleteCategory(id)

  const category = categoryQuery.data

  const isPending = isEditing || isDeleting

  function onSubmit(json: FormValues) {
    updateCategory(json, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  function onDelete() {
    deleteCategory(undefined, {
      onSuccess: () => {
        onClose()
      }
    })
  }

  const defaultValues = categoryQuery.data ? { name: categoryQuery.data.name } : { name: "" }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update category</SheetTitle>
        </SheetHeader>
        {categoryQuery.isLoading ? (
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <CategoryForm id={category?.id} defaultValues={defaultValues} disabled={isPending} onSubmit={onSubmit} onDelete={onDelete} />
        )}
      </SheetContent>
    </Sheet>
  )
}
