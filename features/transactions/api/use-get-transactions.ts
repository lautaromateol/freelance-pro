import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { convertAmountFromMilliunits } from "@/lib/utils";

export function useGetTransactions() {

  const params = useSearchParams()

  const from = params.get("from") || ""
  const to = params.get("to") || ""
  const accountId = params.get("accountId") || ""

  const query = useQuery({
    queryKey: ["transactions", { from, to, accountId }],
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