import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export function useGetCategories() {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async() => {
      const response = await client.api.categories.$get()

      if(!response.ok) {
        throw new Error("Error obtaining categories.")
      }

      return (await response.json()).data
    }
  })

  return query
}