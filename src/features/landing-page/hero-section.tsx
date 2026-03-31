import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/app-ui/button"
import paths from "@/config/paths"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router"

export const HeroSection = () => {
    const navigate = useNavigate();

    const onClickToDashboard = () => {
        navigate(paths.dashboard.path)
    }
    
    return(
        <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(theme(colors.foreground)_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
           <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/10 text-primary px-3 py-1.5 font-medium">
            Next-Gen PERN Stack Architecture
          </Badge>
          
          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight lg:text-7xl text-foreground">
            Inventory management, <br />
             <span className="text-primary">engineered for integrity.</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Eliminate "ghost stock" and race conditions. Built for high-concurrency office environments where transactional precision is non-negotiable.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={onClickToDashboard} size="lg" >
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              View Technical Docs
            </Button>
          </div>
        </div>
      </section>
    )
}