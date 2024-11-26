import Link from "next/link"
import { cloneElement } from "react"
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"

type Props = {
  href: string,
  icon: JSX.Element,
  label: string
}

export function NavItem({ href, icon, label }: Props) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={href}>
          {cloneElement(icon)}
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
