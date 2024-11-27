import { ArrowLeftRight, Banknote, Folders, LayoutGrid } from "lucide-react"
import { NavItem } from "./nav-item"
import { UserCard } from "./user-card"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu } from "./ui/sidebar"
import { SignOutButton } from "./sign-out-button"

const routes = [
  {
    label: "Accounts",
    href: "/accounts",
    icon: <Banknote />
  },
  {
    label: "Categories",
    href: "/categories",
    icon: <LayoutGrid />
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: <ArrowLeftRight />
  },
  {
    label: "Projects",
    href: "/projects",
    icon: <Folders />
  }
]

export function AppSidebar() {

  return (
    <Sidebar>
      <SidebarHeader>
        <UserCard />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <NavItem
                  key={route.href}
                  label={route.label}
                  icon={route.icon}
                  href={route.href}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignOutButton />
      </SidebarFooter>
    </Sidebar>
  )
}