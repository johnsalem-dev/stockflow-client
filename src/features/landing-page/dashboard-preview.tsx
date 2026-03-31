import { Button } from "@/components/app-ui/button"
import { AlertCircle, CheckCircle2, Clock, Search } from "lucide-react";

export const DashboardPreview = () => {
    return (
        <section id="preview" className="container mx-auto px-4 pb-24">
            {/* Swapped bg-white and border-slate-200 for bg-card and border-border. 
                Also changed the shadow to use your dynamic primary color with a low opacity. */}
            <div className="mx-auto max-w-5xl rounded-xl border border-border bg-card shadow-2xl shadow-primary/5 overflow-hidden">
                
                {/* Mock Browser/App Header */}
                <div className="flex items-center justify-between border-b border-border bg-muted/30 p-3">
                    <div className="flex gap-2 pl-2">
                        {/* Swapped slate-300 for border */}
                        <div className="h-3 w-3 rounded-full bg-border" />
                        <div className="h-3 w-3 rounded-full bg-border" />
                        <div className="h-3 w-3 rounded-full bg-border" />
                    </div>
                    {/* Swapped bg-white for bg-background, text-slate-400 for text-muted-foreground */}
                    <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground w-64 shadow-sm">
                        <Search className="h-3 w-3" /> Search SKUs (e.g., PEN-001)...
                    </div>
                </div>

                {/* Mock App Body */}
                <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                        {/* Swapped text-slate-800 for text-card-foreground */}
                        <h3 className="text-lg font-semibold text-card-foreground">Central Supply Room</h3>
                        <Button size="sm" variant="outline" className="text-xs h-8">Export CSV</Button>
                    </div>

                    {/* Mock Data Table */}
                    <div className="rounded-lg border border-border shadow-sm overflow-hidden bg-card">
                        {/* Swapped bg-slate-50 for bg-muted/50 */}
                        <div className="grid grid-cols-12 gap-4 border-b border-border bg-muted/50 p-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            <div className="col-span-2">SKU</div>
                            <div className="col-span-5">Item Description</div>
                            <div className="col-span-2 text-right">On Hand</div>
                            <div className="col-span-3">Status</div>
                        </div>

                        {/* Swapped divide-slate-100 for divide-border */}
                        <div className="divide-y divide-border text-sm">
                            <MockRow sku="TON-B-12" name="LaserJet Black Toner Cartridge" stock={14} status="Healthy" />
                            <MockRow sku="PAP-A4-5" name="A4 Copy Paper (500 Sheets/Ream)" stock={2} status="Low Stock" />
                            <MockRow sku="PEN-B-01" name="Ballpoint Pens, Blue (Box of 50)" stock={0} status="Out of Stock" />
                            <MockRow sku="MOU-W-04" name="Wireless Ergonomic Mouse" stock={8} status="Healthy" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const MockRow = ({ sku, name, stock, status }: { sku: string, name: string, stock: number, status: string }) => {
    let statusColor = "bg-muted text-muted-foreground border-border";
    let Icon = CheckCircle2;
    
    // 💡 THE OPACITY TRICK: Instead of hardcoded -100 backgrounds and -800 texts, 
    // we use /15 for the background and explicit dark:text overrides so they pop in dark mode!
    if (status === "Low Stock") {
      statusColor = "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30";
      Icon = Clock;
    } else if (status === "Out of Stock") {
      // Utilizing shadcn's built-in destructive semantic variable!
      statusColor = "bg-destructive/15 text-destructive dark:text-red-400 border-destructive/30";
      Icon = AlertCircle;
    } else if (status === "Healthy") {
      statusColor = "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30";
    }
  
    return (
      <div className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-muted/50 transition-colors">
        <div className="col-span-2 font-mono text-xs text-muted-foreground">{sku}</div>
        <div className="col-span-5 font-medium text-foreground">{name}</div>
        <div className="col-span-2 text-right font-semibold text-foreground/80">{stock}</div>
        <div className="col-span-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor}`}>
            <Icon className="h-3.5 w-3.5" />
            {status}
          </span>
        </div>
      </div>
    );
};