import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.clients["bulk-delete"]["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.clients["bulk-delete"]["$post"]>

export function useDeleteClients() {
  const queryClient = useQueryClient()

  const { mutate: deleteClients, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.clients["bulk-delete"]["$post"]({
        json
      })

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] })
      toast.success("Clients deleted successfully.")
    },
    onError: () => {
      toast.error("Error deleting clients.")
    }
  })

  return { deleteClients, isPending }
}