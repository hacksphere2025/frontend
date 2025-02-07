import React from 'react';
import { Button } from './components/ui/button';
import CustomAvatar from './my-components/Avatar/App';
import { ModeToggle } from './my-components/ThemeToggle/App'
import SiginInModal from './my-components/SigninModal/App';
import ChatBox from './my-components/Chatbox/App';
import { useUser } from './provider/userProvider/App';

function App() {
  const ref = React.createRef<HTMLButtonElement>();
  const { user } = useUser();
  return (
    <>
      <div className='flex flex-col-reverse h-screen w-screen dark:bg-black'>
        <ChatBox />
        <div className='flex flex-row-reverse'>
          <div className='flex flex-row justify-center m-2 space-x-4'>
            <ModeToggle />
            <SiginInModal onClickReference={ref} />
            {
              user ?
                <CustomAvatar url='RS' /> :
                <Button type='button' onClick={() => { ref.current?.click(); }}>Sign In</Button>
            }
          </div>
        </div>
      </div>    </>
  )
}

export default App
