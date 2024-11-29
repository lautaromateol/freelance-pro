import { client } from "@/lib/client";
import { convertAmountFromMilliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useGetTransactions(from?: string, to?: string, accountId?: string) {
  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: {
          from,
          to,
          accountId
        }
      })

      if (!response.ok) {
        throw new Error("Error obtaining transactions.")
      }

      const { data } = await response.json()

      return data.map((item) => ({
        ...item,
        amount: convertAmountFromMilliunits(item.amount)
      }))
    }
  })

  return query
}