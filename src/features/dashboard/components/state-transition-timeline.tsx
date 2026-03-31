import { type ReactNode } from "react";
import { ArrowUp, ArrowDown, RefreshCcw } from "lucide-react";
import { CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { AppCard, AppCardHeader, AppCardContent } from "@/components/app-ui/app-card"; // Adjust path as needed
import { cn } from "@/lib/utils";

type AuditType = "inward" | "outward" | "reconciliation";
type BadgeVariant = "default" | "blue" | "gray";

interface AuditLog {
  id: string;
  type: AuditType;
  title: string;
  time: string;
  description: ReactNode;
  badge: {
    text: string;
    variant: BadgeVariant;
  };
}

const auditLogs: AuditLog[] = [
  {
    id: "log-1",
    type: "outward",
    title: "Item Stock-Out",
    time: "09:42 AM",
    description: (
      <>
        Maple ID <span className="text-blue-600 font-medium">#456</span> — Physical dispatch confirmed.
      </>
    ),
    badge: { text: "PHYSICAL", variant: "gray" },
  },
  {
    id: "log-2",
    type: "inward",
    title: "Stock-In",
    time: "08:15 AM",
    description: (
      <>
        IGP <span className="text-blue-600 font-medium">#123</span> — Digital ledger updated.
      </>
    ),
    badge: { text: "DIGITAL (MAPLE)", variant: "blue" },
  },
  {
    id: "log-3",
    type: "reconciliation",
    title: "Reconciliation Run",
    time: "04:00 AM",
    description: "System wide audit completed. 0 mismatches found.",
    badge: { text: "AUTOMATED", variant: "gray" },
  },
];

// 3. Helper dictionaries for styling based on transaction type
const typeConfig = {
  outward: {
    icon: ArrowUp,
    bgClass: "bg-red-50 dark:bg-red-500/10",
    iconClass: "text-red-600 dark:text-red-500",
  },
  inward: {
    icon: ArrowDown,
    bgClass: "bg-green-50 dark:bg-green-500/10",
    iconClass: "text-green-600 dark:text-green-500",
  },
  reconciliation: {
    icon: RefreshCcw,
    bgClass: "bg-slate-100 dark:bg-slate-800",
    iconClass: "text-slate-600 dark:text-slate-400",
  },
};

const badgeConfig = {
  default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  gray: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

export function StateTransitionsTimeline() {
  return (
    // Utilize AppCard to ensure the height, shadow, and radius match the grid perfectly
    <AppCard className="h-full overflow-hidden">
      
      {/* AppCardHeader defaults to `flex-row justify-between`. 
        We use tailwind-merge to elegantly override it to a column layout for the title area. 
      */}
      <AppCardHeader className="flex-col items-start space-y-1.5 p-5 pb-5">
        <CardTitle className="text-xl font-bold">State Transitions</CardTitle>
        <CardDescription>Real-time ledger audit</CardDescription>
      </AppCardHeader>

      {/* AppCardContent defaults to `mt-auto p-4 pt-4`. 
        We override with `p-0 mt-0` so our list items can sit completely flush against the edges. 
      */}
      <AppCardContent className="p-0 mt-0 flex-1">
        <div className="flex flex-col divide-y divide-border">
          {auditLogs.map((log) => {
            const Config = typeConfig[log.type];
            const Icon = Config.icon;

            return (
              <div key={log.id} className="flex gap-4 p-5 hover:bg-muted/50 transition-colors">
                {/* Icon Column */}
                <div
                  className={cn(
                    "flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full",
                    Config.bgClass
                  )}
                >
                  <Icon className={cn("w-4 h-4 stroke-[2.5]", Config.iconClass)} />
                </div>

                {/* Content Column */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-foreground">
                      {log.title}
                    </h4>
                    <span className="text-[10px] font-medium text-muted-foreground tracking-wider uppercase">
                      {log.time}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-snug">
                    {log.description}
                  </p>
                  
                  <div className="pt-1">
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase",
                        badgeConfig[log.badge.variant]
                      )}
                    >
                      {log.badge.text}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AppCardContent>

      <CardFooter className="p-0 mt-auto">
        <button className="w-full py-4 text-xs font-bold tracking-wider text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 uppercase transition-colors">
          View All Audit Logs
        </button>
      </CardFooter>
    </AppCard>
  );
}