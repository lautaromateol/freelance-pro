import { ArrowLeftRight, Banknote, BarChart3, Calendar, Folders, LayoutGrid, Users } from "lucide-react"
import { NavItem } from "./nav-item"
import { UserCard } from "./user-card"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarSeparator } from "./ui/sidebar"
import { SignOutButton } from "./sign-out-button"

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <BarChart3 />
  },
  {
    label: "Accounts",
    href: "/dashboard/accounts",
    icon: <Banknote />
  },
  {
    label: "Categories",
    href: "/dashboard/categories",
    icon: <LayoutGrid />
  },
  {
    label: "Clients",
    href: "/dashboard/clients",
    icon: <Users />
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: <ArrowLeftRight />
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
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
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Others</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItem
                label="Calendar"
                icon={<Calendar />}
                href="/dashboard/calendar"
              />
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
