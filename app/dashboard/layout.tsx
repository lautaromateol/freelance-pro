import { AppSidebar } from "@/components/app-sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarProvider } from "@/providers/sidebar-provider"

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <div className="w-full min-h-screen flex">
        <AppSidebar />
        <div className="flex w-full flex-col p-4">
          <SidebarTrigger />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
