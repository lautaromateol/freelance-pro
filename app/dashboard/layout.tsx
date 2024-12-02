import { AppSidebar } from "@/components/app-sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { DialogProvider } from "@/providers/dialog-provider"
import { SheetProvider } from "@/providers/sheet-provider"
import { SidebarProvider } from "@/providers/sidebar-provider"
import { Toaster } from "sonner"

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
          <main className="p-6">
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
