import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar.tsx'
import CustomSidebar from '@/my-components/Sidebar/App.tsx'
import { UserProvider } from './provider/userProvider/App.tsx'
import { Toaster } from './components/ui/toaster.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      storageKey="vite-ui-theme"
    >
      <UserProvider>
        <SidebarProvider>
          <CustomSidebar />
          <SidebarTrigger />
          <App />
        </SidebarProvider>
      </UserProvider>
    </ThemeProvider>
    <Toaster/>
  </StrictMode>,
)
