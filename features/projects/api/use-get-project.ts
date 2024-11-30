import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { convertAmountFromMilliunits } from "@/lib/utils";

export function useGetProject(id?: string) {
  const query = useQuery({
    queryKey: ["project", { id }],
    queryFn: async () => {
      const response = await client.api.projects[":id"]["$get"]({
        param: { id }
      })

      if (!response.ok) {
        throw new Error("Error obtaining project.")
      }

      const { data } = await response.json()

      return { ...data, budget: convertAmountFromMilliunits(data.budget) }
    }
  })

  return query
}