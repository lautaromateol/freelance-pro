import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.lists.$post>["json"]
type ResponseType = InferResponseType<typeof client.api.lists.$post, 200>["data"]

export function useCreateList() {
  const queryClient = useQueryClient()

  const { mutate: createList, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.lists.$post({
        json,
      })

      if (!response.ok) {
        throw new Error("Error creating list.")
      }

      const { data } = await response.json()
      return data
    },
    onSuccess: (data) => {
      toast.success("List created successfully.")
      queryClient.invalidateQueries({ queryKey: ["lists", { projectId: data.projectId }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { createList, isPending }
}