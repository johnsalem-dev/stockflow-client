import { Box } from "lucide-react"

export const Footer = () => {
    return(
        <footer className="border-t border-border bg-background text-muted-foreground py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <Box className="h-5 w-5" /> StockFlow
          </div>
          
          <p>© 2026 StockFlow Systems. Built for high-concurrency logistics.</p>
        </div>
      </footer>
    )
}