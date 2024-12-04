/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export function useConfirm(title: string, message: string): [() => Promise<unknown>, () => JSX.Element] {

  const [promise, setPromise] = useState<{ resolve: (value?: unknown) => void } | null>(null);

  function confirm() {
    return new Promise((resolve, _) => {
      setPromise({ resolve })
    })
  }

  function handleClose() {
    setPromise(null)
  }

  function handleConfirm() {
    promise?.resolve(true)
    handleClose()
  }

  function handleCancel() {
    promise?.resolve(false)
    handleClose()
  }

  function ConfirmDialog() {
    return (
      <Dialog open={promise !== null}>
        <DialogContent className="w-[60rem]">
          <DialogHeader>
            <DialogTitle>
              {title}
            </DialogTitle>
            <DialogDescription>
              {message}
            </DialogDescription>
          </DialogHeader>
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

