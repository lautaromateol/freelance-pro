import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<typeof client.api.transactions[":id"]["$get"]>["param"]
type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$get"]>

export function useGetTransaction(id?: string) {
  const query = useQuery<ResponseType, Error, RequestType>({
    queryKey: ["transaction", { id }],
    queryFn: async() => {
      const response = await client.api.transactions[":id"]["$get"]({
        param: { id }
      })

      const data = await response.json()

      return data
    }
  })

  return query
}