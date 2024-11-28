"use client"
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Props = {
  id: string
}

export function AccountDropdown({ id }: Props) {

  const { onOpen } = useOpenAccount()

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
