import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from 'hono/client'
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.clients[":id"]["$patch"]>["json"]
type ResponseType = InferResponseType<typeof client.api.clients[":id"]["$patch"]>

export function useEditClient(id?: string) {

  const queryClient = useQueryClient()

  const { mutate: updateClient, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.clients[":id"].$patch({
        json,
        param: { id }
      })

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client", { id }] })
      queryClient.invalidateQueries({ queryKey: ["clients"] })
      toast.success("Client updated successfully.")
    },
    onError: () => {
      toast.error("Error updating client.")
    }
  })

  return { updateClient, isPending }
}