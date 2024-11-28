"use client"
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Props = {
  id: string
}

export function CategoryDropdown({ id }: Props) {

  const { onOpen } = useOpenCategory()

  const { deleteCategory, isPending } = useDeleteCategory(id)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled={isPending} onClick={() => onOpen(id)}>
          <div className="flex items-center gap-x-2">
            Edit
            <Edit className="size-4" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isPending} onClick={() => deleteCategory()}>
          <div className="flex items-center gap-x-2">
            Delete
            <Trash className="size-4" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
