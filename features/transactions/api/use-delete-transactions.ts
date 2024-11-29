import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>

export function useDeleteTransactions() {
  const queryClient = useQueryClient()

  const { mutate: deleteTransactions, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions["bulk-delete"]["$post"]({
        json
      })

      const data = await response.json()
      return data
    },
    onSuccess: () => {
      toast.success("Transactions deleted successfully.")
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
    onError: () => {
      toast.error("Error deleting transactions.")
    }
  })

  return { deleteTransactions, isPending }
}