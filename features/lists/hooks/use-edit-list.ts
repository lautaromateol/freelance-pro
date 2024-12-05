import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.lists[":id"]["$patch"]>["json"]
type ResponseType = InferResponseType<typeof client.api.lists[":id"]["$patch"], 200>["data"]

export function useEditList(id?: string) {
  const queryClient = useQueryClient()

  const { mutate: editList, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.lists[":id"]["$patch"]({
        json,
        param: { id }
      })

      if (!response.ok) {
        throw new Error("Error updating list.")
      }

      const { data } = await response.json()
      return data
    },
    onSuccess: (data) => {
      toast.success("List updated successfully.")
      queryClient.invalidateQueries({ queryKey: ["project", { id: data.projectId }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { editList, isPending }
}