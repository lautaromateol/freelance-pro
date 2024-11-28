import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from 'hono/client'
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.categories.$post>["json"]
type ResponseType = InferResponseType<typeof client.api.categories.$post>

export function useCreateCategory() {

  const queryClient = useQueryClient()

  const { mutate: createCategory, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async(json) => {
      const response = await client.api.categories.$post({
        json
      })
      return await response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
      toast.success("Category created successfully.")
    },
    onError: () => {
      toast.error("Error creating category.")
    }
  })

  return { createCategory, isPending }
}