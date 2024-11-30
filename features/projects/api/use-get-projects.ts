import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { convertAmountFromMilliunits } from "@/lib/utils";

export function useGetProjects(from?: string, to?: string, accountId?: string) {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await client.api.projects.$get({
        query: {
          from,
          to,
          accountId
        }
      })

      if (!response.ok) {
        throw new Error("Error obtaining projects.")
      }

      const { data } = await response.json()

      return data.map((item) => ({
        ...item,
        budget: convertAmountFromMilliunits(item.budget)
      }))
    }
  })

  return query
}