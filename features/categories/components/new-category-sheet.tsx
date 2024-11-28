"use client"
import { z } from "zod"
import { useNewCategory } from "@/features/categories/hooks/use-new-category"
import { CategoryForm } from "./category-form"
import { useCreateCategory } from "@/features/categories/api/use-create-category"
import { categorySchema } from "@/schemas/category"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

type FormValues = z.input<typeof categorySchema>

export function NewCategorySheet() {

  const { isOpen, onClose } = useNewCategory()
  const { createCategory, isPending } = useCreateCategory()

  function onSubmit(json: FormValues) {
    createCategory(json, {
      onSuccess: () => onClose()
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new category</SheetTitle>
        </SheetHeader>
        <CategoryForm onSubmit={onSubmit} disabled={isPending} defaultValues={{ name: "" }} />
      </SheetContent>
    </Sheet>
  )
}
