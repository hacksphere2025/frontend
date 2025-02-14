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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Order } from "./pages/Order/App";
import { Profile } from "./pages/Profile/App";

function App() {
  const { user } = useUser();
  const [signInDialogState, setSignInDialogState] =
    React.useState<boolean>(false);
  console.log(user);
  return (
    <>
      <BrowserRouter>
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
              <CustomAvatar url={user.userName.slice(0, 1)} />
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
      </BrowserRouter>
    </>
  );
}
export default App;
