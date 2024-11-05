"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from "recharts"

interface YearlyResult {
  year: number
  realEstateValueWithAppreciation: number
  mutualFundValueAfterCAGR: number
}

interface ProjectionChartProps {
  results: YearlyResult[]
}

export default function ProjectionChart({ results }: ProjectionChartProps) {
  return (
    <div className="w-full h-[400px] mt-4">
      <ChartContainer
        config={{
          realEstateValueWithAppreciation: {
            label: "Real Estate Value",
            color: "#696969",
          },
          mutualFundValueAfterCAGR: {
            label: "Mutual Fund Value",
            color: "#333333",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={results} margin={{ top: 20, right: 30, left: 50, bottom: 80 }}>
            <XAxis 
              dataKey="year" 
              stroke="#333"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              minTickGap={15}
              label={{ value: "Year", position: "insideBottom", offset: -10 }}
            />
            <YAxis
              domain={['auto', 'auto']}
              padding={{ top: 40, bottom: 40 }}
              stroke="#333"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
              label={{ value: "Value (₹)", angle: -90, position: "insideLeft", offset: -30 }}
            />
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
            <Tooltip
              content={<ChartTooltipContent />}
              formatter={(value: number, name: string) => {
                const label = name === "Mutual Fund Value" ? "📈 Mutual Fund" : "🏠 Real Estate";
                return `${label}: ₹${value.toLocaleString()}`;
              }}
              labelFormatter={(label, payload) => {
                const year = payload && payload.length ? payload[0].payload.year : label;
                return `Year: ${year}`;
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="realEstateValueWithAppreciation" name="Real Estate Value" stroke="#696969" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="mutualFundValueAfterCAGR" name="Mutual Fund Value" stroke="#333333" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
