import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.clients[":id"]["$delete"]>

export function useDeleteClient(id?: string) {
  const queryClient = useQueryClient()

  const { mutate: deleteClient, isPending } = useMutation<ResponseType, Error>({
    mutationFn: async() => {
      const response = await client.api.clients[":id"]["$delete"]({
        param: { id }
      })

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client", { id }] })
      queryClient.invalidateQueries({ queryKey: ["clients"] })
      toast.success("Client deleted successfully.")
    },
    onError: () => {
      toast.error("Error deleting client.")
    }
  })

  return { deleteClient, isPending }
}