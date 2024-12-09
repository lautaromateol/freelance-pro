import { InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.lists[":id"]["$delete"], 200>["data"]

export function useDeleteList(id: string) {
  const queryClient = useQueryClient()

  const { mutate: deleteList, isPending } = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.lists[":id"]["$delete"]({
        param: { id }
      })

      if (!response.ok) {
        throw new Error("Error deleting list.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success("List deleted successfully.")
      queryClient.invalidateQueries({ queryKey: ["lists", { projectId: data.projectId }] })

    },
    onError: (error) => toast.error(error.message)
  })

  return { deleteList, isPending }
}