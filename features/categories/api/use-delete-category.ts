import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>

export function useDeleteCategory(id?: string) {
  const queryClient = useQueryClient()

  const { mutate: deleteCategory, isPending } = useMutation<ResponseType, Error>({
    mutationFn: async() => {
      const response = await client.api.categories[":id"]["$delete"]({
        param: { id }
      })

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category", { id }] })
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Category deleted successfully.")
    },
    onError: () => {
      toast.error("Error deleting category.")
    }
  })

  return { deleteCategory, isPending }
}