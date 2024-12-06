import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "@/lib/client"

type RequestType = InferRequestType<typeof client.api.tasks[":id"]["$patch"]>["json"]
type ResponseType = InferResponseType<typeof client.api.tasks[":id"]["$patch"], 200>["data"]

export function useEditTask(id: string) {
  const queryClient = useQueryClient()
  const { mutate: editTask, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async(json) => {
      const response = await client.api.tasks[":id"]["$patch"]({
        json,
        param: {
          id
        }
      })

      if(!response.ok) {
        throw new Error("Error updating task.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", { projectId: data.list.project.id }] })
      toast.success("Task updated successfully.")
    },
    onError: (error) => toast.error(error.message) 
  })

  return { editTask, isPending }
}