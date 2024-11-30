import { AlertTriangle } from "lucide-react"
import { useOpenCategory } from "@/features/categories/hooks/use-open-category"

type Props = {
  id?: string
  name?: string
}

export function CategoryCell({ id, name }: Props) {

  const { onOpen } = useOpenCategory()

  if (id) {
    return (
      <div role="button" onClick={() => onOpen(id)} className="flex items-center underline">
        <p className="text-sm">{name}</p>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-x-1 text-rose-500">
      <AlertTriangle className="size-4" />
      <p className="text-sm">Uncategorized</p>
    </div>
  )
}
