import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from 'hono/client'
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"]
type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>

export function useEditAccount(id?: string) {

  const queryClient = useQueryClient()

  const { mutate: updateAccount, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts[":id"].$patch({
        json,
        param: { id }
      })

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account", { id }] })
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      toast.success("Account updated successfully.")
    },
    onError: () => {
      toast.error("Error updating account.")
    }
  })

  return { updateAccount, isPending }
}