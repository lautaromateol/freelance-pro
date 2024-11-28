import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useGetAccount(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["account", { id }],
    queryFn: async () => {
      const response = await client.api.accounts[":id"].$get({
        param: { id }
      })

      if (!response.ok) {
        throw new Error("Error obtaining account.")
      }

      return (await response.json()).data
    }
  })

  return query
}