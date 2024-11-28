import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>

export function useDeleteAccounts() {
  const queryClient = useQueryClient()

  const { mutate: deleteAccounts, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts["bulk-delete"]["$post"]({
        json
      })

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      toast.success("Accounts deleted successfully.")
    },
    onError: () => {
      toast.error("Error deleting accounts.")
    }
  })

  return { deleteAccounts, isPending }
}