"use client"
import { useEffect, useState } from "react";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { OpenAccountSheet } from "@/features/accounts/components/open-account-sheet";

export function SheetProvider() {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (isMounted) {
    return (
      <>
        <NewAccountSheet />
        <OpenAccountSheet />
      </>
    )
  }
}
