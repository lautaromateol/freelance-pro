import { client } from "@/lib/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.projects["bulk-delete"]["$post"]>["json"]
type ResponseType = InferResponseType<typeof client.api.projects["bulk-delete"]["$post"]>

export function useDeleteProjects() {
  const queryClient = useQueryClient()

  const { mutate: deleteProjects, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.projects["bulk-delete"]["$post"]({
        json
      })

      const data = await response.json()
      return data
    },
    onSuccess: () => {
      toast.success("Projects deleted successfully.")
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
    onError: () => {
      toast.error("Error deleting projects.")
    }
  })

  return { deleteProjects, isPending }
}