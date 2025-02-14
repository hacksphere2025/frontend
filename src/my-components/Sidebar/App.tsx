import { JSX } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ListOrdered, Plus, User, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/provider/userProvider/App";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const items = [
  {
    title: "Your Profile",
    url: "profile",
    icon: User,
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
  const { user, session, selectedSession, setSelectedSession } = useUser();

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
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="dark:bg-black"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => {
                        setSelectedSession("");
                        navigate(item.url);
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {user && (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Your Sessions
                  <Plus className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarMenu>
                  {session.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      {selectedSession == item._id ? (
                        <SidebarMenuButton
                          asChild
                          className="dark:bg-white dark:text-black bg-black text-white"
                        >
                          <button
                            onClick={() => {
                              setSelectedSession(item._id);
                              navigate(`/chat/${item._id}`);
                            }}
                          >
                            <span>{item.title}</span>
                          </button>
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton asChild>
                          <button
                            onClick={() => {
                              setSelectedSession(item._id);
                              navigate(`/chat/${item._id}`);
                            }}
                          >
                            <span>{item.title}</span>
                          </button>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
