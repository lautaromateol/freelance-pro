import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";

type ResponseType = InferResponseType<typeof client.api.lists["bulk-delete"]["$post"], 200>["project"]
type RequestType = InferRequestType<typeof client.api.lists["bulk-delete"]["$post"]>["json"]

export function useDeleteLists() {
  const queryClient = useQueryClient()

  const { mutate: deleteLists, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.lists["bulk-delete"]["$post"]({
        json
      })

      if (!response.ok) {
        throw new Error("Error deleting lists.")
      }

      const { project } = await response.json()

      return project
    },
    onSuccess: (projectId) => {
      toast.success("Lists deleted successfully.")
      if(projectId) {
        queryClient.invalidateQueries({ queryKey: ["project", { id: projectId.projectId }] })
      }
    },
    onError: (error) => toast.error(error.message)
  })

  return { deleteLists, isPending }
}