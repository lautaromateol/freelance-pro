"use client"
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { useOpenProject } from "@/features/projects/hooks/use-open-project";
import { useOpenProjectDetail } from "@/features/projects/hooks/use-open-project-detail";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Props = {
  id: string
}

export function ProjectDropdown({ id }: Props) {

  const { onOpen: onOpenProject } = useOpenProject()

  const { onOpen: onOpenProjectDetail } = useOpenProjectDetail()

  const { deleteProject, isPending } = useDeleteProject(id)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled={isPending} onClick={() => onOpenProject(id)}>
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
        <DropdownMenuItem disabled={isPending} onClick={() => onOpenProjectDetail(id)}>
          <div className="flex items-center gap-x-2">
            View in detail
            <Eye className="size-4" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
