"use client"

import { Bar, BarChart, XAxis } from "recharts"
import { CardTitle, CardDescription } from "@/components/ui/card" // Keeping for standard typography
import { AppCard, AppCardHeader, AppCardContent } from "@/components/app-ui/app-card" // Your custom primitive
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

// 1. Mock Data representing the 7 bars in your design
const chartData = [
  { label: "DAY 01", inward: 120, outward: 80 },
  { label: "", inward: 200, outward: 150 },
  { label: "", inward: 250, outward: 120 },
  { label: "DAY 15", inward: 140, outward: 100 },
  { label: "", inward: 220, outward: 180 },
  { label: "", inward: 280, outward: 200 },
  { label: "CURRENT", inward: 260, outward: 190 },
]

// 2. Chart Configuration mapped to Tailwind semantic colors
const chartConfig = {
  inward: {
    label: "Inward",
    color: "hsl(221, 83%, 53%)", // blue-600
  },
  outward: {
    label: "Outward",
    color: "hsl(215, 16%, 47%)", // slate-500
  },
} satisfies ChartConfig

export function StockFlowChart() {
  return (
    // Utilize AppCard. h-full ensures it stretches to match the Timeline card next to it.
    <AppCard className="h-full">
      
      {/* AppCardHeader defaults to `flex-row justify-between items-start`. 
          This perfectly aligns our left-side title block and right-side custom legend. 
          We just override the bottom padding (`pb-6`) to give the chart room to breathe. */}
      <AppCardHeader className="pb-6">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold text-foreground">
            Stock Flow Dynamics
          </CardTitle>
          <CardDescription>
            Movement analysis across last 30 business days
          </CardDescription>
        </div>
        
        {/* Localized Legend mounted in the right slot of the flex-between header */}
        <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[hsl(221,83%,53%)]" />
            <span>Inward</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[hsl(215,16%,47%)]" />
            <span>Outward</span>
          </div>
        </div>
      </AppCardHeader>

      {/* AppCardContent natively pushes content down and standardizes padding. 
          We use `mt-0` to prevent it from pushing entirely to the bottom if the card is stretched,
          and `flex-1` to let it fill available space. */}
      <AppCardContent className="flex-1 pb-4 mt-0">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart 
            accessibilityLayer 
            data={chartData} 
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            barSize={48} // Thick bars like the mockup
          >
            {/* Clean minimalist X-Axis */}
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              className="text-xs font-semibold fill-muted-foreground"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            
            {/* Bottom Bar (Outward) */}
            <Bar
              dataKey="outward"
              stackId="a"
              fill="var(--color-outward)"
              radius={[0, 0, 4, 4]}
            />
            
            {/* Top Bar (Inward) with stroke hack for transparent gap illusion */}
            <Bar
              dataKey="inward"
              stackId="a"
              fill="var(--color-inward)"
              radius={[4, 4, 0, 0]}
              stroke="hsl(var(--card))"
              strokeWidth={3}
            />
          </BarChart>
        </ChartContainer>
      </AppCardContent>
    </AppCard>
  )
}