import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$delete"]>["param"]
type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>

export function useDeleteTransaction(id?: string) {
  const queryClient = useQueryClient()

  const { mutate: deleteTransaction, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.transactions[":id"]["$delete"]({
        param: { id }
      })

      const data = await response.json()
      return data
    },
    onSuccess: () => {
      toast.success("Transaction deleted successfully.")
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] })
    },
    onError: () => {
      toast.error("Error deleting transaction.")
    }
  })

  return { deleteTransaction, isPending }
}