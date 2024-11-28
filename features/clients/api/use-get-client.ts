import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useGetClient(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["client", { id }],
    queryFn: async () => {
      const response = await client.api.clients[":id"].$get({
        param: { id }
      })

      if (!response.ok) {
        throw new Error("Error obtaining client.")
      }

      return (await response.json()).data
    }
  })

  return query
}