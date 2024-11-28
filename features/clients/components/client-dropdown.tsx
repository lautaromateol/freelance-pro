"use client"
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useOpenClient } from "@/features/clients/hooks/use-open-client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Props = {
  id: string
}

export function ClientDropdown({ id }: Props) {

  const { onOpen } = useOpenClient()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onOpen(id)}>
          <div className="flex items-center gap-x-2">
            Edit
            <Edit className="size-4" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-x-2">
            Delete
            <Trash className="size-4" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
