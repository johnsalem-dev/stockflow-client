import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app'
import { ThemeProvider } from './components/theme/theme-provider'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="inventory-ui-theme">
    <App />
    <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  </StrictMode>,
)
