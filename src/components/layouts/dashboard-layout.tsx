import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    SidebarFooter,
    SidebarHeader
} from '@/components/ui/sidebar'
import { ArrowUpRightSquare, BarChart2, Bell, Box, Database, HelpCircle, LayoutDashboard, ScanLine, Search, Settings, ShoppingCart } from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Input } from '../ui/input'
import { ThemeToggle } from '../app-ui/theme-toggle'

const DashboardLayout = () => {
    const location = useLocation();
    return (
        <div className='flex min-h-dvh w-full'>
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader >
                        <div className="flex items-center gap-3 px-2 py-2">
                            <div className="flex aspect-square size-10 items-center justify-center rounded-lg text-white">
                                <Box className="size-9 text-blue-600" />
                            </div>
                            <div className='flex flex-col'>
                                <span>StockFlow <span className="text-slate-400 font-medium">Enterprise</span></span>
                                <span className='text-xs text-teal-500 font-light'>by Devsinc</span>
                            </div>
                        </div>
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu className="gap-2 mt-4">

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={location.pathname === '/' || location.pathname === '/dashboard'}>
                                            <NavLink to="/dashboard">
                                                <LayoutDashboard />
                                                <span>Dashboard</span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={location.pathname.includes('/master-data')}>
                                            <NavLink to="/master-data">
                                                <Database />
                                                <span>Master Data</span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={location.pathname.includes('/item-catalog')}>
                                            <NavLink to="/item-catalog">
                                                <Box />
                                                <span>Item Catalog</span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={location.pathname.includes('/procurement')}>
                                            <NavLink to="/procurement">
                                                <ShoppingCart />
                                                <span>Procurement</span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={location.pathname.includes('/issuance')}>
                                            <NavLink to="/issuance">
                                                <ArrowUpRightSquare />
                                                <span>Issuance</span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild isActive={location.pathname.includes('/reports')}>
                                            <NavLink to="/reports">
                                                <BarChart2 />
                                                <span>Reports</span>
                                            </NavLink>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    {/* Footer with Quick Scan, Settings, and Support */}
                    <SidebarFooter className="p-4 space-y-4">
                        <div className="px-2">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-sm">
                                <ScanLine className="size-4" />
                                Quick Scan
                            </Button>
                        </div>

                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={location.pathname === '/settings'}>
                                    <NavLink to="/settings">
                                        <Settings />
                                        <span>Settings</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={location.pathname === '/support'}>
                                    <NavLink to="/support">
                                        <HelpCircle />
                                        <span>Support</span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                <div className='flex flex-1 flex-col'>
                    <header className='bg-card sticky top-0 z-50 flex h-16 items-center gap-4 border-b px-4 sm:px-6'>
                        {/* Left: Sidebar Toggle */}
                        <SidebarTrigger className='[&_svg]:!size-5 shrink-0' />

                        {/* Middle: Global Search */}
                        <div className="flex flex-1 items-center">
                            {/* The relative wrapper allows us to position the Search icon absolutely inside the input */}
                            <div className="relative w-full max-w-2xl">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search Master Data records..."
                                    // We use bg-slate-100 or bg-muted to give it that solid gray fill without a harsh border
                                    className="w-full bg-slate-100/50 border-transparent pl-10 focus-visible:bg-white focus-visible:border-primary focus-visible:ring-1 h-10 shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Right: Actions & Profile */}
                        <div className="flex items-center gap-2 sm:gap-4 shrink-0 text-slate-600">
                            <ThemeToggle />
                            <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-full">
                                <Bell className="size-5" />
                                <span className="sr-only">Notifications</span>
                            </Button>

                            <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-full">
                                <Settings className="size-5" />
                                <span className="sr-only">Settings</span>
                            </Button>

                            <Avatar className="size-9 border cursor-pointer hover:opacity-80 transition-opacity">
                                {/* Replace src with your actual user image logic later */}
                                <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                                <AvatarFallback className="bg-blue-600 text-white font-medium">AM</AvatarFallback>
                            </Avatar>
                        </div>
                    </header>

                    <main className='size-full flex-1 bg-background px-4 py-6 sm:px-6'>
                        <Outlet />
                    </main>
                    <footer className='bg-background h-12 border-t border-border px-4 sm:px-6 flex items-center justify-between text-[11px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground shrink-0'>

                        {/* Left Side: System Status & Info */}
                        <div className='flex items-center gap-3 sm:gap-6'>
                            <span className='flex items-center gap-1.5'>
                                System Health:
                                {/* Kept emerald, but added a dark mode fallback so it glows nicely on dark surfaces */}
                                <span className='text-emerald-600 dark:text-emerald-400 font-bold'>Operational</span>
                            </span>

                            {/* Swapped text-slate-300 for text-border. This ensures the divider matches your actual layout borders in both themes! */}
                            <span className='text-border hidden sm:inline'>|</span>

                            <span className='hidden sm:flex items-center gap-1.5'>
                                Reconciliation: 14:02 UTC
                            </span>

                            <span className='text-border hidden sm:inline'>|</span>

                            <span>V0.0.1 Beta</span>
                        </div>

                        {/* Right Side: Links */}
                        <div className='flex items-center gap-4 sm:gap-6'>
                            {/* Swapped hover:text-slate-800 for hover:text-foreground */}
                            <a href='#' className='hover:text-foreground transition-colors'>
                                Documentation
                            </a>
                            <a href='#' className='hover:text-foreground transition-colors'>
                                Support
                            </a>
                        </div>
                    </footer>
                </div>
            </SidebarProvider>
        </div>
    )
}

export default DashboardLayout