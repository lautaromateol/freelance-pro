import { useOpenAccount } from "@/features/accounts/hooks/use-open-account"

type Props = {
  id: string
  name: string
}

export function AccountCell({ id, name }: Props) {

  const { onOpen } = useOpenAccount()

  return (
    <div role="button" onClick={() => onOpen(id)} className="flex items-center underline">
      <p className="text-sm">{name}</p>
    </div>
  )
}
