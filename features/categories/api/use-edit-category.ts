import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from 'hono/client'
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"]
type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>

export function useEditCategory(id?: string) {

  const queryClient = useQueryClient()

  const { mutate: updateCategory, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories[":id"].$patch({
        json,
        param: { id }
      })

      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category", { id }] })
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Category updated successfully.")
    },
    onError: () => {
      toast.error("Error updating category.")
    }
  })

  return { updateCategory, isPending }
}