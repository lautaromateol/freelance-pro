import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.projects[":id"]["$delete"]>

export function useDeleteProject(id?: string) {
  const queryClient = useQueryClient()

  const { mutate: deleteProject, isPending } = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.projects[":id"]["$delete"]({
        param: { id }
      })

      const data = await response.json()
      return data
    },
    onSuccess: () => {
      toast.success("Project deleted successfully.")
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      queryClient.invalidateQueries({ queryKey: ["project", { id }] })
    },
    onError: () => {
      toast.error("Error deleting project.")
    }
  })

  return { deleteProject, isPending }
}