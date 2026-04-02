import { Plus, LayoutGrid } from "lucide-react";
import { AppCard, AppCardContent, AppCardHeader } from "@/components/app-ui/app-card";
import { CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "cat-1",
    name: "Kitchen",
    assetClass: "Operations",
    itemCount: 142,
    icon: "🍳", // Replace with your Lucide icons (e.g., Utensils)
    color: "text-orange-600 bg-orange-50 dark:bg-orange-500/10 dark:text-orange-400",
  },
  {
    id: "cat-2",
    name: "Stationery",
    assetClass: "Admin",
    itemCount: 89,
    icon: "🖊️",
    color: "text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400",
  },
  {
    id: "cat-3",
    name: "Hardware",
    assetClass: "IT Infrastructure",
    itemCount: 214,
    icon: "💻",
    color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400",
  },
  
];

export const CategoryManagement = () => {
  return (
    <AppCard className="w-full border-none shadow-none overflow-hidden bg-card">
      <AppCardHeader className="flex flex-row items-center justify-between pt-4 px-5 pb-4 space-y-0 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/40 shrink-0">
            <LayoutGrid className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
          <CardTitle className="text-foreground text-lg font-bold leading-tight">
            Categories
          </CardTitle>
        </div>
      </AppCardHeader>

      <AppCardContent className="px-5 pb-5 pt-4 h-[300px] overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <AppCard key={cat.id} variant="category">
              <div className="flex justify-between items-start">
                <div className={cn("p-2 rounded-lg text-lg", cat.color)}>
                  {cat.icon}
                </div>
                <span className="text-[10px] font-bold text-muted-foreground/50 bg-background/50 px-2 py-1 rounded uppercase tracking-tighter">
                  {cat.itemCount} Items
                </span>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">{cat.name}</h4>
                <p className="text-[10px] text-muted-foreground font-medium truncate">
                  Asset Class: <span className="text-foreground/70">{cat.assetClass}</span>
                </p>
              </div>
            </AppCard>
          ))}
          
          <button className="border-2 border-dashed border-muted flex flex-col items-center justify-center rounded-xl p-4 gap-2 hover:bg-muted/20 transition-colors group min-h-[110px]">
            <div className="bg-muted p-1 rounded-full group-hover:bg-muted-foreground/10">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              New Category
            </span>
          </button>
        </div>
      </AppCardContent>
    </AppCard>
  );
};