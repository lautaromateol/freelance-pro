import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"], 200>["data"]

export function useCreateTransactions() {
  const queryClient = useQueryClient()

  const { mutate: createTransactions, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async(json) => {
      const response = await client.api.transactions["bulk-create"]["$post"]({
        json
      })

      if(!response.ok) {
        throw new Error("Error creating transactions.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Transactions imported successfully.")
    },
    onError: (error) => toast.error(error.message)
  })

  return { createTransactions, isPending }
}