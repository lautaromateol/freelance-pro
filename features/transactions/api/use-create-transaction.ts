import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.transactions.$post>["json"]
type ResponseType = InferResponseType<typeof client.api.transactions.$post>

export function useCreateTransaction() {
  const queryClient = useQueryClient()

  const { mutate: createTransaction, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions.$post({ json })
      const data = await response.json()
      return data
    },
    onSuccess: () => {
      toast.success("Transaction created successfully.")
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
    onError: () => {
      toast.error("Error creating transaction.")
    }
  })

  return { createTransaction, isPending }
}