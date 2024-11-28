import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$delete"]>

export function useDeleteAccount(id?: string) {
  const queryClient = useQueryClient()

  const { mutate: deleteAccount, isPending } = useMutation<ResponseType, Error>({
    mutationFn: async() => {
      const response = await client.api.accounts[":id"]["$delete"]({
        param: { id }
      })

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", { id }] })
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      toast.success("Account deleted successfully.")
    },
    onError: () => {
      toast.error("Error deleting account.")
    }
  })

  return { deleteAccount, isPending }
}