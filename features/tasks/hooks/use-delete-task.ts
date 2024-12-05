import { InferResponseType } from "hono"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "@/lib/client"

type ResponseType = InferResponseType<typeof client.api.tasks[":id"]["$patch"], 200>["data"]

export function useDeleteTask(id: string) {
  const queryClient = useQueryClient()
  const { mutate: deleteTask, isPending } = useMutation<ResponseType, Error>({
    mutationFn: async() => {
      const response = await client.api.tasks[":id"]["$delete"]({
        param: {
          id
        }
      })

      if(!response.ok) {
        throw new Error("Error deleting task.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project", { id: data.list.project.id }] })
      toast.success("Task deleted successfully.")
    },
    onError: (error) => toast.error(error.message) 
  })

  return { deleteTask, isPending }
}