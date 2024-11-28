import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useGetAccounts() {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async() => {
      const response = await client.api.accounts.$get()

      if(!response.ok) {
        throw new Error("Error obtaining accounts.")
      }

      return (await response.json()).data
    }
  })

  return query
}