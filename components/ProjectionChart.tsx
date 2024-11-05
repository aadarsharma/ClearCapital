"use client";

import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from "recharts";

interface YearlyResult {
  year: number;
  realEstateValueWithAppreciation: number;
  mutualFundValueAfterCAGR: number;
}

interface ProjectionChartProps {
  results: YearlyResult[];
}

export default function ProjectionChart({ results }: ProjectionChartProps) {
  // Color mapping for line identifiers
  const colorMap = {
    realEstateValueWithAppreciation: "#696969", // Real Estate line color
    mutualFundValueAfterCAGR: "#333333"         // Mutual Fund line color
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial mobile view status
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    // Update on resize
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="chart-container w-full mt-4" style={{ height: "400px" }}>
      <ChartContainer
        config={{
          realEstateValueWithAppreciation: {
            label: "Real Estate Value",
            color: colorMap.realEstateValueWithAppreciation,
          },
          mutualFundValueAfterCAGR: {
            label: "Mutual Fund Value",
            color: colorMap.mutualFundValueAfterCAGR,
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={results}
            margin={{
              top: 20,
              right: 30,
              left: 50,
              bottom: isMobile ? 10 : 80 // Adjust bottom padding based on view
            }}
          >
            <XAxis 
              dataKey="year" 
              stroke="#333"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              minTickGap={15}
              padding={{ left: 20, right: 20 }}
              label={{ value: "Year", position: "insideBottom", offset: -10 }}
            />
            <YAxis
              domain={['auto', 'auto']}
              padding={{ top: 20, bottom: 20 }}
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
              formatter={(value: number, name: string, props) => {
                // Determine the line color and label based on the data key
                const color = colorMap[props.dataKey] || "#000";
                const label = name === "Mutual Fund Value" ? "Mutual Fund Value" : "Real Estate Value";

                // Return a single JSX element with inline color styling
                return (
                  <span key={props.dataKey} style={{ color }}>
                    {label}: ₹{value.toLocaleString()}
                  </span>
                );
              }}
              labelFormatter={(label, payload) => {
                const year = payload && payload.length ? payload[0].payload.year : label;
                return `Year: ${year}`;
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="realEstateValueWithAppreciation"
              name="Real Estate Value"
              stroke={colorMap.realEstateValueWithAppreciation}
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="mutualFundValueAfterCAGR"
              name="Mutual Fund Value"
              stroke={colorMap.mutualFundValueAfterCAGR}
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
