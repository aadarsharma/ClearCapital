"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from "recharts"

interface ProjectionData {
  year: number
  realEstateValue: number
  mutualFundValue: number
}

interface ProjectionChartProps {
  results: ProjectionData[]
}

export default function ProjectionChart({ results }: ProjectionChartProps) {
  return (
    <div className="w-full h-[400px] mt-4">
      <ChartContainer
        config={{
          realEstateValue: {
            label: "Real Estate Value",
            color: "#1f77b4",
          },
          mutualFundValue: {
            label: "Mutual Fund Value",
            color: "#ff7f0e",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={results} margin={{ top: 20, right: 30, left: 50, bottom: 80 }}>
            {/* X-Axis */}
            <XAxis 
              dataKey="year" 
              stroke="#333"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              minTickGap={15} // Additional gap between tick labels for more spacing
              label={{ value: "Year", position: "insideBottom", offset: -10 }}
            />
            
            {/* Y-Axis */}
            <YAxis
              domain={['auto', 'auto']}
              padding={{ top: 40, bottom: 40 }} // Increased top and bottom padding for maximum clarity
              stroke="#333"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
              label={{ value: "Value (₹)", angle: -90, position: "insideLeft", offset: -30 }}
            />

            {/* Grid Lines */}
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />

            {/* Tooltip */}
            <Tooltip
              content={<ChartTooltipContent />}
              formatter={(value: number) => `₹${value.toLocaleString()}`}
              labelFormatter={(label, payload) => {
                const year = payload && payload.length ? payload[0].payload.year : label;
                return `Year: ${year}`;
              }}
            />

            {/* Legend */}
            <Legend verticalAlign="top" height={36} />

            {/* Real Estate Line */}
            <Line 
              type="monotone" 
              dataKey="realEstateValue" 
              name="Real Estate Value"
              stroke="#1f77b4" 
              strokeWidth={3} 
              dot={{ r: 3 }} 
              activeDot={{ r: 5 }} // Larger dot on hover for better visibility
            />
            
            {/* Mutual Fund Line */}
            <Line 
              type="monotone" 
              dataKey="mutualFundValue" 
              name="Mutual Fund Value"
              stroke="#ff7f0e" 
              strokeWidth={3} 
              dot={{ r: 3 }} 
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
