"use client"
import { useEffect, useState } from "react";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { OpenAccountSheet } from "@/features/accounts/components/open-account-sheet";
import { NewCategorySheet } from "@/features/categories/components/new-category-sheet";
import { OpenCategorySheet } from "@/features/categories/components/open-category-sheet";
import { NewClientSheet } from "@/features/clients/components/new-client-sheet";
import { OpenClientSheet } from "@/features/clients/components/open-client-sheet";
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet";
import { OpenTransactionSheet } from "@/features/transactions/components/open-transaction-sheet";

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
        <NewCategorySheet />
        <OpenCategorySheet />
        <NewClientSheet />
        <OpenClientSheet />
        <NewTransactionSheet />
        <OpenTransactionSheet />
      </>
    )
  }
}
