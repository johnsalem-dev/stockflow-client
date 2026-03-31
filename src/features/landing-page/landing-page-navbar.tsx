import { Button } from "@/components/app-ui/button"
import { Box } from "lucide-react"

export const NavBar = () => {
    return(
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
            <Box className="h-6 w-6" />
            <span>StockFlow <span className="text-muted-foreground font-medium">Enterprise</span> <span className='text-xs text-teal-500 dark:text-teal-400 font-light'>by Devsinc</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/70">
            <a href="#features" className="hover:text-primary transition-colors">Architecture</a>
            <a href="#preview" className="hover:text-primary transition-colors">Interface</a>
            <a href="#security" className="hover:text-primary transition-colors">Audit Trails</a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" >Sign In</Button>
            <Button size="sm">Request Demo</Button>
          </div>
        </div>
      </nav>
    )
}