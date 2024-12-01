import { AlertTriangle } from "lucide-react"
import { useOpenClient } from "@/features/clients/hooks/use-open-client"

type Props = {
  id?: string
  name?: string
}

export function ClientCell({ id, name }: Props) {

  const { onOpen } = useOpenClient()

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
      <p className="text-sm">No client</p>
    </div>
  )
}
