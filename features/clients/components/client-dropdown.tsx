"use client"
import { useOpenClient } from "@/features/clients/hooks/use-open-client";
import { useDeleteClient } from "@/features/clients/api/use-delete-client";
import { Dropdown } from "@/components/dropdown";

type Props = {
  id: string
}

export function ClientDropdown({ id }: Props) {

  const { onOpen } = useOpenClient()

  const { deleteClient, isPending } = useDeleteClient(id)

  return (
    <Dropdown
      onOpen={() => onOpen(id)}
      onDelete={() => deleteClient()}
      isPending={isPending}
    />
  )
}
