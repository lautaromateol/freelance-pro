import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$patch"]>["json"]
type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$patch"], 200>["data"]

export function useEditTransaction(id?: string) {
  const queryClient = useQueryClient()

  const { mutate: editTransaction, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions[":id"]["$patch"]({
        param: { id },
        json
      })

      if (!response.ok) {
        throw new Error("Error updating transaction.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data: ResponseType) => {
      toast.success("Transaction updated successfully.")
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] })

      if (data.projectId) {
        queryClient.invalidateQueries({ queryKey: ["project", { id: data.projectId }] })
      }
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return { editTransaction, isPending }
}