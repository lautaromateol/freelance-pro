"use client"
import Link from "next/link"
import { cloneElement } from "react"
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type Props = {
  href: string,
  icon: JSX.Element,
  label: string
}

export function NavItem({ href, icon, label }: Props) {

  const pathname = usePathname()

  return (
    <SidebarMenuItem className={cn(
      pathname === href && "bg-sidebar-accent text-sidebar-accent-foreground rounded-md"
    )}>
      <SidebarMenuButton asChild>
        <Link href={href}>
          {cloneElement(icon)}
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
