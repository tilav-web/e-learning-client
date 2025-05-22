import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { menu } from "./menu";
import PrivateRoute from "@/private/private-route";
import { useAuth } from "@/stores/auth/auth";
import { Power } from "lucide-react";
import { Button } from "../ui/button";
import { authService } from "@/services/auth.service";
import { toastSuccess } from "@/common/utils/toast-actions";

export default function AppSidebar({ open }: { open: boolean }) {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = await authService.logout();
      logout();
      toastSuccess(data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Sidebar variant={"floating"} collapsible={"icon"}>
      <SidebarHeader
        className={`flex flex-row items-center ${
          !open && "justify-center"
        } border-b`}
      >
        <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
          {auth && "teacher" in auth && (
            <img
              className="w-full h-full object-cover object-center"
              src={auth.teacher.image}
              alt={auth.teacher.full_name}
            />
          )}
          {auth && "student" in auth && (
            <img
              className="w-full h-full object-cover object-center"
              src={auth.student.image}
              alt={auth.student.full_name}
            />
          )}
        </div>
        {open && (
          <div>
            <p className="font-bold text-base">{auth?.uid}</p>
            <span className="line-clamp-1 text-sm font-thin capitalize">
              {auth && "teacher" in auth && auth.teacher.short_name}
              {auth && "student" in auth && auth.student.short_name}
            </span>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        {menu.map((group) => {
          return (
            <PrivateRoute key={group.title} roles={group.roles}>
              <SidebarGroup>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      return (
                        <PrivateRoute key={item.url} roles={item.roles}>
                          <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                              <Link to={item.url}>
                                <item.icon />
                                <span>{item.name}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </PrivateRoute>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </PrivateRoute>
          );
        })}
      </SidebarContent>
      <SidebarFooter className="px-3">
        <Button
          onClick={handleLogout}
          variant={"destructive"}
          className="font-bold cursor-pointer select-none"
        >
          <Power />
          {open && <>Log Out</>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
