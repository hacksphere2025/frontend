import { JSX, useState } from "react";
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
import {
  CircleDashed,
  List,
  ListIcon,
  ListOrdered,
  ListTodo,
  Plus,
  User,
  UsersRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/provider/userProvider/App";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { api } from "@/api/App";
import { LoginType } from "@/types/User";

const buyerItems = [
  {
    title: "Your Profile",
    type: LoginType.Common,
    url: "profile",
    icon: User,
  },
  {
    title: "Your Orders",
    type: LoginType.Buyer,
    url: "order",
    icon: ListTodo,
  },
  {
    title: "Negotitations",
    type: LoginType.Common,
    url: "negotitations",
    icon: UsersRound,
  },
];

const sellerItems = [
  {
    title: "Your Profile",
    type: LoginType.Common,
    url: "profile",
    icon: User,
  },
  {
    title: "Dashboard",
    type: LoginType.Seller,
    url: "dashboard",
    icon: CircleDashed,
  },
  {
    title: "Your Listings",
    type: LoginType.Seller,
    url: "listings",
    icon: ListIcon,
  },
  {
    title: "Negotitations",
    type: LoginType.Common,
    url: "negotitations",
    icon: UsersRound,
  },
];

export default function CustomSidebar(): JSX.Element {
  const navigator = useNavigate();
  const toast = useToast();
  const provider = useUser();
  const [newSessionName, setNewSessionName] = useState<string>("");
  const [sessionCreateModal, setSessionCreateModalState] =
    React.useState<boolean>(false);

  const navigate = (url: string) => {
    if (!provider.user && url == "/") {
      navigator(url);
      return;
    }
    if (provider.user) {
      navigator(url);
      return;
    }
    toast.toast({ title: "Error", description: "Please sign in to continue" });
  };

  const createNewSession = async () => {
    if (newSessionName.trim() === "") {
      return;
    }
    console.log("hello");
    try {
      const response = await api.post("/session", {
        title: newSessionName,
      });
      if (response.status == 200) {
        const payload = response.data.data;
        provider.setSession((prev) => [
          ...prev,
          {
            title: newSessionName,
            time: payload.time,
            _id: payload._id,
          },
        ]);
        provider.setSelectedSession(payload._id);
        setSessionCreateModalState(false);
        navigate(`/chat/${payload._id}`);
        toast.toast({
          title: "Success",
          description: "A new was created successfully",
        });
      }
    } catch (error) {
      console.log(error);
    }
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
              {provider.user?.loginType === LoginType.Seller
                ? sellerItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <button
                          onClick={() => {
                            provider.setSelectedSession("");
                            navigate(item.url);
                          }}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                : buyerItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <button
                          onClick={() => {
                            provider.setSelectedSession("");
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
        {provider.user && (
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Your Sessions
                  <Plus
                    className="ml-auto"
                    onClick={() => {
                      setSessionCreateModalState(true);
                    }}
                  />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <SidebarMenu>
                {provider.session.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {provider.selectedSession == item._id ? (
                      <SidebarMenuButton
                        asChild
                        className="dark:bg-white dark:text-black bg-black text-white"
                      >
                        <button
                          onClick={() => {
                            provider.setSelectedSession(item._id);
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
                            provider.setSelectedSession(item._id);
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
            </SidebarGroup>
          </Collapsible>
        )}
      </SidebarContent>
      <Dialog
        onOpenChange={setSessionCreateModalState}
        open={sessionCreateModal}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Session</DialogTitle>
            <DialogDescription>Create a new session here</DialogDescription>
          </DialogHeader>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Name</Label>
            <Input
              type="email"
              id="email"
              value={newSessionName}
              onChange={(e) => {
                setNewSessionName(e.target.value);
              }}
              placeholder="Name"
            />
          </div>
          <DialogFooter>
            <Button onClick={createNewSession}>Create Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sidebar>
  );
}
