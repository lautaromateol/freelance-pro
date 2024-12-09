"use client"
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { Dropdown } from "@/components/dropdown";

type Props = {
  id: string
}

export function AccountDropdown({ id }: Props) {

  const { onOpen } = useOpenAccount()

  const { deleteAccount, isPending } = useDeleteAccount(id)

  return (
    <Dropdown
      onOpen={() => onOpen(id)}
      onDelete={() => deleteAccount()}
      isPending={isPending}
    />
  )
}
