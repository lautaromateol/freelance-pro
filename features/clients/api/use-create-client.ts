import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from 'hono/client'
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.clients.$post>["json"]
type ResponseType = InferResponseType<typeof client.api.clients.$post>

export function useCreateClient() {

  const queryClient = useQueryClient()

  const { mutate: createClient, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async(json) => {
      const response = await client.api.clients.$post({
        json
      })
      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
      toast.success("Client created successfully.")
    },
    onError: () => {
      toast.error("Error creating client.")
    }
  })

  return { createClient, isPending }
}