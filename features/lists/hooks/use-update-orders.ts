import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.lists["update-orders"]["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.lists["update-orders"]["$post"], 200>["data"]

export function useUpdateOrders() {
  const queryClient = useQueryClient()

  const { mutate: updateOrders, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async(json) => {
      const response = await client.api.lists["update-orders"]["$post"]({
        json,
      })

      if (!response.ok) {
        throw new Error("Error moving list.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success("List moved successfully.")
      queryClient.invalidateQueries({ queryKey: ["lists", { projectId: data[0].projectId }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { updateOrders, isPending }
}