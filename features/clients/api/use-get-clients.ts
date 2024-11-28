import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useGetClients() {
  const query = useQuery({
    queryKey: ["clients"],
    queryFn: async() => {
      const response = await client.api.clients.$get()

      if(!response.ok) {
        throw new Error("Error obtaining clients.")
      }

      return (await response.json()).data
    }
  })

  return query
}