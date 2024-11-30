import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/client";

type RequestType = InferRequestType<typeof client.api.projects.$post>["json"]
type ResponseType = InferResponseType<typeof client.api.projects.$post>

export function useCreateProject() {
  const queryClient = useQueryClient()

  const { mutate: createProject, isPending } = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.projects.$post({ json })
      const data = await response.json()
      return data
    },
    onSuccess: () => {
      toast.success("Project created successfully.")
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
    onError: () => {
      toast.error("Error creating project.")
    }
  })

  return { createProject, isPending }
}