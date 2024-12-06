import { InferRequestType, InferResponseType } from "hono"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "@/lib/client"

type RequestType = InferRequestType<typeof client.api.tasks.$post>["json"]
type ResponseType = InferResponseType<typeof client.api.tasks.$post, 200>["data"]

export function useCreateTask() {
  const queryClient = useQueryClient()
  const { mutate: createTask, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async(json) => {
      const response = await client.api.tasks.$post({
        json
      })

      if(!response.ok) {
        throw new Error("Error creating task.")
      }

      const { data } = await response.json()

      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks", { projectId: data.list.project.id }] })
      toast.success("Task created successfully.")
    },
    onError: (error) => toast.error(error.message) 
  })

  return { createTask, isPending }
}