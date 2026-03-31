import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Layers, ShieldCheck, Zap } from "lucide-react";

export const CoreFeatures = () => {
    return(
        <section id="features" className="bg-background py-24 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-2xl text-center mx-auto">
            {/* Swapped text-slate-900 for text-foreground */}
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Transactional integrity across every node.
            </h2>
            {/* Swapped text-slate-600 for text-muted-foreground */}
            <p className="mt-4 text-muted-foreground text-lg">
              We've replaced the "fat" controller pattern with a Service-Repository layer to ensure your 
              inventory is tracked with bank-grade precision.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            <FeatureCard 
              icon={<ShieldCheck className="text-primary h-6 w-6" />}
              title="ACID Compliant"
              description="PostgreSQL backend ensuring zero race conditions during simultaneous stock-outs."
            />
            <FeatureCard 
              icon={<Zap className="text-amber-600 dark:text-amber-400 h-6 w-6" />}
              title="Optimistic Updates"
              description="Powered by TanStack Query for a latency-free, instant-feedback user experience."
            />
            <FeatureCard 
              icon={<Layers className="text-indigo-600 dark:text-indigo-400 h-6 w-6" />}
              title="Type-Safe Schema"
              description="End-to-end Zod + Prisma shared schemas syncing your database and frontend."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-emerald-600 dark:text-emerald-400 h-6 w-6" />}
              title="Deep Audit Logs"
              description="Immutable paper trails for every SKU movement, preventing untraceable shrinkage."
            />
          </div>
        </div>
      </section>
    )
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <Card className="hover:shadow-md transition-all">
      <CardHeader>
        {/* Swapped bg-slate-50 and ring-slate-200/60 for muted background and border variables */}
        <div className="mb-3 w-fit rounded-xl bg-muted/50 p-2.5 ring-1 ring-border">
          {icon}
        </div>
        {/* Stripped out text-slate-900. <CardTitle> handles text-foreground natively! */}
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Swapped text-slate-600 for text-muted-foreground */}
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
);