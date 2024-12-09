import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
  onOpen: () => void
  onDelete: () => void
  isPending: boolean
}

export function Dropdown({ onOpen, onDelete, isPending }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem disabled={isPending} onClick={onOpen} onPointerDown={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-x-2">
            Edit
            <Edit className="size-4" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isPending} onClick={onDelete} onPointerDown={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-x-2">
            Delete
            <Trash className="size-4" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
