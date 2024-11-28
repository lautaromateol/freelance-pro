import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useGetCategory(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["category", { id }],
    queryFn: async () => {
      const response = await client.api.categories[":id"].$get({
        param: { id }
      })

      if (!response.ok) {
        throw new Error("Error obtaining category.")
      }

      return (await response.json()).data
    }
  })

  return query
}