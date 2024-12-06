import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useGetTasks(projectId: string) {
  const query = useQuery({
    queryKey: ["tasks", { projectId }],
    queryFn: async () => {
      const response = await client.api.tasks[":projectId"]["$get"]({
        param: {
          projectId
        }
      })

      if(!response.ok) {
        throw new Error("Error obtaining tasks.")
      }

      const { data } = await response.json()

      return data
    }
  })

  return query
}