import { client } from "@/lib/client";
import { convertAmountFromMilliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export function useGetSummary() {

  const params = useSearchParams()
  
  const from = params.get("from") || ""
  const to = params.get("to") || ""
  const accountId = params.get("accountId") || ""

  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId
        }
      })

      if (!response.ok) {
        throw new Error("Error obtaining summary data.")
      }

      const data = await response.json()

      return {
        ...data,
        income: convertAmountFromMilliunits(data.income),
        expenses: convertAmountFromMilliunits(data.expenses),
        remaining: convertAmountFromMilliunits(data.remaining),
        categoriesExpenses: data.categoriesExpenses.map((item) => ({ ...item, amount: convertAmountFromMilliunits(item.amount) })),
        days: data.days.map((item) => ({ ...item, expenses: convertAmountFromMilliunits(item.expenses), income: convertAmountFromMilliunits(item.income) }))
      }
    }
  })
  
  return query
}