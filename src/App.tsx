import React from "react";
import { Button } from "./components/ui/button";
import CustomAvatar from "./my-components/Avatar/App";
import { ModeToggle } from "./my-components/ThemeToggle/App";
import SiginInModal from "./my-components/SigninModal/App";
import ChatBox from "./pages/Chatbox/App";
import { useUser } from "./provider/userProvider/App";
import Cart from "./my-components/Cart/App";
import CustomSidebar from "./my-components/Sidebar/App";
import { SidebarTrigger } from "./components/ui/sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Order } from "./pages/Order/App";
import { Profile } from "./pages/Profile/App";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function App() {
  const navigate = useNavigate();
  const { user, clear } = useUser();
  const [signInDialogState, setSignInDialogState] =
    React.useState<boolean>(false);
  console.log(user);
  return (
    <>
      <CustomSidebar />
      <SidebarTrigger />
      <div className="flex flex-col w-full">
        
        <div className="flex flex-row justify-end m-2 space-x-4">
          <Cart />
          <ModeToggle />
          <SiginInModal
            setSignInDialogState={setSignInDialogState}
            signInDialogState={signInDialogState}
          />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <CustomAvatar url={user.userName.slice(0, 1)} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    setSignInDialogState(false);
                    clear();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button type="button" onClick={() => setSignInDialogState(true)}>
              Sign In
            </Button>
          )}
          </div>
          <Routes>
            <Route element={<ChatBox />} path="/" />
            <Route element={<ChatBox />} path="/chat/:sessionId" />
            <Route element={<Order />} path="/order" />
            <Route element={<Profile />} path="/profile" />
          </Routes>
      </div>
    </>
  );
}
export default App;
