import { Button } from "@/components/app-ui/button"

export const CTASection = () => {
    return(
        <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to eliminate ghost stock?</h2>
          <p className="text-primary-foreground/80 mb-10 max-w-2xl mx-auto text-lg">
            Deploy the definitive enterprise inventory system today. Sync your first warehouse in under 5 minutes.
          </p>
          <Button variant="elevated" size="lg">
            Initialize Workspace
          </Button>
        </div>
      </section>
    )
}