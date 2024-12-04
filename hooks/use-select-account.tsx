/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from "react";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function useSelectAccount(): [() => Promise<unknown>, () => JSX.Element] {

  const [promise, setPromise] = useState<{ resolve: (value?: unknown) => void } | null>(null);

  const accountsQuery = useGetAccounts()
  const { createAccount, isPending } = useCreateAccount()

  const accountsOptions = (accountsQuery.data ? accountsQuery.data : []).map((item) => ({
    label: item.name,
    value: item.id
  }))

  const selectValue = useRef<string>()

  function confirm() {
    return new Promise((resolve, _) => {
      setPromise({ resolve })
    })
  }

  function handleClose() {
    setPromise(null)
  }

  function handleConfirm() {
    promise?.resolve(selectValue.current)
    handleClose()
  }

  function handleCancel() {
    promise?.resolve(false)
    handleClose()
  }

  function handleCreateAccount(value: string) {
    createAccount({ name: value })
  }

  function ConfirmDialog() {
    return (
      <Dialog open={promise !== null}>
        <DialogContent className="w-[60rem]">
          <DialogHeader>
            <DialogTitle>
              Select an account
            </DialogTitle>
            <DialogDescription>
              You must select an account to continue
            </DialogDescription>
          </DialogHeader>
          <Select
            placeholder="Select or create an account."
            options={accountsOptions}
            onCreate={handleCreateAccount}
            onChange={(value) => selectValue.current = value}
            disabled={accountsQuery.isLoading || isPending}
          />
           <div className="flex items-center w-full">
            <Button variant="outline" className="mr-2" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return [confirm, ConfirmDialog]
}

