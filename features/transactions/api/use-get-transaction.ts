import { client } from "@/lib/client";
import { convertAmountFromMilliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
export function useGetTransaction(id?: string) {
  const query = useQuery({
    queryKey: ["transaction", { id }],
    queryFn: async () => {
      const response = await client.api.transactions[":id"]["$get"]({
        param: { id }
      })

      if (!response.ok) {
        throw new Error("Error obtaining transaction.")
      }

      const { data } = await response.json()

      return { ...data, amount: convertAmountFromMilliunits(data.amount) }
    }
  })

  return query
}