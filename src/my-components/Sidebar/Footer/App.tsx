import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";
import CustomAvatar from "@/my-components/Avatar/App";
import { useUser } from "@/provider/userProvider/App";

export default function Footer() {
  const { user } = useUser();
  if (user)
    return (
      <SidebarFooter>
        <div className="flex flex-row space-x-4 w-full justify-center items-center hover:bg-zinc-800 rounded-lg p-3">
          <CustomAvatar url={user.userName.slice(0, 1)} />
          <div className="flex flex-col">
            <div className="">{user.userName}</div>
            <div className="text-muted-foreground text-sm">{user.email}</div>
          </div>
        </div>
      </SidebarFooter>
    );
}
