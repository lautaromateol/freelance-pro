import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.transactions.$post>["json"]
type ResponseType = InferResponseType<typeof client.api.transactions.$post, 200>["data"]

export function useCreateTransaction() {
  const queryClient = useQueryClient()

  const { mutate: createTransaction, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions.$post({ json })

      if (!response.ok) {
        throw new Error("Error creating transaction.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data: ResponseType) => {
      toast.success("Transaction created successfully.")
      queryClient.invalidateQueries({ queryKey: ["transactions"] })

      if (data.projectId) {
        queryClient.invalidateQueries({ queryKey: ["project", { id: data.projectId }] })
      }
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return { createTransaction, isPending }
}