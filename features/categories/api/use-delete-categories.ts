import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>

export function useDeleteCategories() {
  const queryClient = useQueryClient()

  const { mutate: deleteCategories, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories["bulk-delete"]["$post"]({
        json
      })

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Categories deleted successfully.")
    },
    onError: () => {
      toast.error("Error deleting categories.")
    }
  })

  return { deleteCategories, isPending }
}