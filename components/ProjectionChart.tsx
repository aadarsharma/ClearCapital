"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export default function ProjectionChart({ results }) {
  return (
    <div className="w-full h-[400px] mt-4">
      <ChartContainer
        config={{
          realEstateValue: {
            label: "Real Estate Value",
            color: "hsl(var(--primary))",
          },
          mutualFundValue: {
            label: "Mutual Fund Value",
            color: "hsl(var(--secondary))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={results} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <XAxis 
              dataKey="year" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={['auto', 'auto']}
              padding={{ top: 20, bottom: 20 }}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="realEstateValue" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2} 
              dot={false} 
            />
            <Line 
              type="monotone" 
              dataKey="mutualFundValue" 
              stroke="hsl(var(--secondary))" 
              strokeWidth={2} 
              dot={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
