import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app'
import { ThemeProvider } from './components/theme/theme-provider'
import { Toaster } from 'react-hot-toast'
import { TooltipProvider } from './components/ui/tooltip'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TooltipProvider delayDuration={300}>
    <ThemeProvider defaultTheme="system" storageKey="inventory-ui-theme">
    <App />
    <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
    </TooltipProvider>
  </StrictMode>,
)
