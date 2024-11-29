import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.transactions.$get>

export function useGetTransactions(from?: string, to?: string, accountId?: string) {
  const query = useQuery<ResponseType, Error>({
    queryKey: ["transaction"],
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: {
          from,
          to,
          accountId
        }
      })

      const data = await response.json()

      return data
    }
  })

  return query
}