"use client"
import { SidebarProvider as SidebarProviderElement } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
}

export function SidebarProvider({ children }: Props) {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (isMounted) {
    return (
      <SidebarProviderElement>
        {children}
      </SidebarProviderElement>
    )
  }
}
