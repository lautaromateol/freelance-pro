import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from 'hono/client'
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"]
type ResponseType = InferResponseType<typeof client.api.accounts.$post>

export function useCreateAccount() {

  const queryClient = useQueryClient()

  const { mutate: createAccount, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async(json) => {
      const response = await client.api.accounts.$post({
        json
      })
      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      toast.success("Account created successfully.")
    },
    onError: () => {
      toast.error("Error creating account.")
    }
  })

  return { createAccount, isPending }
}