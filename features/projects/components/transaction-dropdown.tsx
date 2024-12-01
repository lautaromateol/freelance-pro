"use client"
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useOpenProject } from "@/features/projects/hooks/use-open-project";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Props = {
  id: string
}

export function ProjectDropdown({ id }: Props) {

  const { onOpen } = useOpenProject()

  const { deleteProject, isPending } = useDeleteProject(id)

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
        <DropdownMenuItem disabled={isPending} onClick={() => deleteProject()}>
          <div className="flex items-center gap-x-2">
            Delete
            <Trash className="size-4" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
