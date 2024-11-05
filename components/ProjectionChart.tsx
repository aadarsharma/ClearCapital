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
          <LineChart data={results}>
            <XAxis 
              dataKey="year" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="realEstateValue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="mutualFundValue" stroke="hsl(var(--secondary))" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}