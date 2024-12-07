import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.tasks["update-orders"]["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.tasks["update-orders"]["$post"], 200>["data"]

export function useUpdateTasksOrders() {
  const queryClient = useQueryClient()

  const { mutate: updateTasksOrders, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async(json) => {
      const response = await client.api.tasks["update-orders"]["$post"]({
        json,
      })

      if (!response.ok) {
        throw new Error("Error moving list.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      toast.success("Task moved successfully.")
      queryClient.invalidateQueries({ queryKey: ["tasks", { projectId: data[0].list.projectId }] })
    },
    onError: (error) => toast.error(error.message)
  })

  return { updateTasksOrders, isPending }
}