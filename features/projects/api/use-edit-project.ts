import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.projects[":id"]["$patch"]>["json"]
type ResponseType = InferResponseType<typeof client.api.projects[":id"]["$patch"]>

export function useEditProject(id?: string) {
  const queryClient = useQueryClient()

  const { mutate: editProject, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.projects[":id"]["$patch"]({
        param: { id },
        json
      })

      const data = await response.json()

      return data
    },
    onSuccess: () => {
      toast.success("Project updated successfully.")
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      queryClient.invalidateQueries({ queryKey: ["project", { id }] })
    },
    onError: () => {
      toast.error("Error updating project.")
    }
  })

  return { editProject, isPending }
}