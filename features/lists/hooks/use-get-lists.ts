import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useGetLists(projectId: string) {
  const query = useQuery({
    queryKey: ["lists", { projectId }],
    queryFn: async () => {
      const response = await client.api.lists[":projectId"]["$get"]({
        param: {
          projectId
        }
      })

      if(!response.ok) {
        throw new Error("Error obtaining lists.")
      }

      const { data } = await response.json()

      return data
    }
  })

  return query
}