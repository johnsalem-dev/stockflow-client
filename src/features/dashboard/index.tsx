
import { AppCard, AppCardContent, AppCardHeader, AppCardIcon, AppCardLabel, AppCardValue } from '@/components/app-ui/app-card';
import { PageHeader } from '@/components/layouts/page-header';
import { Button } from '@/components/app-ui/button'; // Assuming Shadcn Button
import { Calendar, Package, Layers, CheckCircle } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';
import { StockFlowChart } from '@/components/app-ui/stockflow-chart';
import { StateTransitionsTimeline } from './components/state-transition-timeline';

const inventoryStats = [
    {
        id: "total-items",
        title: "Total Items",
        value: "14,284",
        icon: <Package className="h-5 w-5" />,
        trend: { value: "+2.4%", isPositive: true },
    },
    {
        id: "active-depts",
        title: "Active Departments",
        value: "24",
        icon: <Layers className="h-5 w-5" />,
    },
    {
        id: "in-stock",
        title: "In Stock",
        value: "12,102",
        icon: <CheckCircle className="h-5 w-5" />,
    },
]

export const DashboardGrid = () => {
    return (
        <div className="min-h-screen">
            {/* Open/Closed Principle in action: We inject specific buttons for this specific page */}
            <PageHeader
                preTitle="REAL-TIME RECONCILIATION"
                title="Inventory Command Center"
            >
                <Button size={"sm"} variant="outline">
                    <Calendar className="mr-2 h-4 w-4" /> Last 30 Days
                </Button>
                <Button size={"sm"}>
                    + New Adjustment
                </Button>
            </PageHeader>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {inventoryStats.map((stat) => (
                    <AppCard key={stat.id}>
                        <AppCardHeader>
                            <AppCardIcon>
                                {stat.icon}
                            </AppCardIcon>

                            {stat.trend && (
                                <span className={cn(
                                    "text-xs font-bold px-2 py-1 rounded-md",
                                    stat.trend.isPositive
                                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                        : "bg-destructive/10 text-destructive"
                                )}>
                                    {stat.trend.value}
                                </span>
                            )}
                        </AppCardHeader>

                        <AppCardContent>
                            <AppCardLabel>{stat.title}</AppCardLabel>
                            <AppCardValue>{stat.value}</AppCardValue>
                        </AppCardContent>
                    </AppCard>
                ))}

                <InventoryAlertCard />

            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>

                {/* Left Side: Chart takes up 2 out of 3 columns on large screens */}
                <div className='lg:col-span-2 flex flex-col'>
                    <StockFlowChart />
                </div>

                {/* Right Side: Timeline takes up 1 out of 3 columns on large screens */}
                <div className='lg:col-span-1 flex flex-col'>
                    <StateTransitionsTimeline />
                </div>

            </div>

        </div>
    );
};


const InventoryAlertCard = () => (
    <AppCard className="border-destructive/50 ">
        <AppCardHeader className="items-center">
            <div className="flex gap-1">
                {/* You can define semantic 'warning' variables in your global.css for yellow */}
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500/20 text-orange-600 text-xs font-bold">L</span>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-destructive/20 text-destructive text-xs font-bold">O</span>
            </div>
            <span className="text-xs font-bold text-destructive uppercase">
                Action Required
            </span>
        </AppCardHeader>

        <AppCardContent>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <AppCardLabel className="text-orange-600">Low Stock</AppCardLabel>
                    <AppCardValue>184</AppCardValue>
                </div>
                <div>
                    <AppCardLabel className="text-destructive">Out of Stock</AppCardLabel>
                    <AppCardValue>12</AppCardValue>
                </div>
            </div>
        </AppCardContent>
    </AppCard>)