"use client"
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { Dropdown } from "@/components/dropdown";

type Props = {
  id: string
}

export function CategoryDropdown({ id }: Props) {

  const { onOpen } = useOpenCategory()

  const { deleteCategory, isPending } = useDeleteCategory(id)

  return (
    <Dropdown
      onOpen={() => onOpen(id)}
      onDelete={() => deleteCategory()}
      isPending={isPending}
    />
  )
}
