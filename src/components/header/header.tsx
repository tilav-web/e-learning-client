import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  return (
    <header className="flex items-center justify-between pl-2 py-4 pr-6 border-b">
      <SidebarTrigger />
    </header>
  );
}
