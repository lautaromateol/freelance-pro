import { Toaster } from "sonner"
import { AppSidebar } from "@/components/app-sidebar"
import { AccountFilter } from "@/components/account-filter"
import { DateFilter } from "@/components/date-filter"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DialogProvider } from "@/providers/dialog-provider"
import { SheetProvider } from "@/providers/sheet-provider"
import { SidebarProvider } from "@/providers/sidebar-provider"

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <div className="w-full min-h-screen flex">
        <AppSidebar />
        <div className="flex w-full flex-col p-2 lg:p-4">
          <div className="flex items-center gap-x-2">
            <SidebarTrigger />
            <DateFilter />
            <AccountFilter />
          </div>
          <main className="p-2 lg:p-6">
            <Toaster />
            <SheetProvider />
            <DialogProvider />
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
