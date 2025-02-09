import { JSX } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Bot, ListOrdered, UsersRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/provider/userProvider/App";
import { useToast } from "@/hooks/use-toast";

const items = [
  {
    title: "Chatbot",
    url: "/",
    icon: Bot,
  },
  {
    title: "Your Orders",
    url: "order",
    icon: ListOrdered,
  },
  {
    title: "Negotitations",
    url: "negotitations",
    icon: UsersRound,
  },
];

export default function CustomSidebar(): JSX.Element {
  const navigator = useNavigate();
  const toast = useToast();
  const { user } = useUser();

  const navigate = (url: string) => {
    if (!user && url == "/") {
      navigator(url);
      return;
    }
    if (user) {
      navigator(url);
      return;
    }
    toast.toast({ title: "Error", description: "Please sign in to continue" });
  };

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas" className="dark:bg-black">
      <SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <button onClick={() => navigate(item.url)}>
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </SidebarHeader>
    </Sidebar>
  );
}
