"use client"
import qs from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetSummary } from "@/features/dashboard/api/use-get-summary";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function AccountFilter() {

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const accountId = searchParams.get("accountId") || "all"

  const { isLoading: isLoadingSummary } = useGetSummary()
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts()

  const isLoading = isLoadingAccounts || isLoadingSummary

  function pushToUrl(accountId?: string) {
    const query = {
      from,
      to,
      accountId
    }

    if (accountId === "all") {
      query.accountId = ""
    }

    const url = qs.stringifyUrl({
      url: pathname,
      query
    }, {
      skipNull: true,
      skipEmptyString: true
    })

    router.push(url)
  }

  return (
    <div className="lg:w-auto w-full p-0">
      <Select
        value={accountId}
        onValueChange={pushToUrl}
        disabled={isLoading}
      >
        <SelectTrigger>
          <SelectValue placeholder="All" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            All accounts
          </SelectItem>
          {accounts?.map((account) => (
            <SelectItem key={account.id} value={account.id}>
              {account.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
