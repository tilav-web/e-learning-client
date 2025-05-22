import Header from "@/components/header/header";
import AppSidebar from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function SubLayout() {
  const [open, setOpen] = useState(true);

  return (
    <SidebarProvider
      open={open}
      onOpenChange={(value) => setOpen(value)}
      className="flex items-start"
    >
      <AppSidebar open={open} />
      <div className="flex-1">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
