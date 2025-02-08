import React from "react";
import { Button } from "./components/ui/button";
import CustomAvatar from "./my-components/Avatar/App";
import { ModeToggle } from "./my-components/ThemeToggle/App";
import SiginInModal from "./my-components/SigninModal/App";
import ChatBox from "./my-components/Chatbox/App";
import { useUser } from "./provider/userProvider/App";
import Cart from "./my-components/Cart/App";

function App() {
  const { user } = useUser();
  const [signInDialogState, setSignInDialogState] =
    React.useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col-reverse h-screen w-screen dark:bg-black overflow-y-scroll">
        <ChatBox />
        <div className="flex flex-row-reverse">
          <div className="flex flex-row justify-center m-2 space-x-4">
            <Cart />
            <ModeToggle />
            <SiginInModal
              setSignInDialogState={setSignInDialogState}
              signInDialogState={signInDialogState}
            />
            {user ? (
              <CustomAvatar url="RS" />
            ) : (
              <Button type="button" onClick={() => setSignInDialogState(true)}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
