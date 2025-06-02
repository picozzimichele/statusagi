"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";

// Define the data structure for the chart
const chartData = [
    { year: "1997", desktop: 186, mobile: 80 },
    { year: "1998", desktop: 305, mobile: 200 },
    { year: "1999", desktop: 237, mobile: 120 },
    { year: "2000", desktop: 73, mobile: 190 },
    { year: "2001", desktop: 209, mobile: 130 },
    { year: "2002", desktop: 214, mobile: 140 },
];

// Define the chart configuration
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
} satisfies ChartConfig;

export function ExampleChart() {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
                <XAxis
                    dataKey="year"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 4)}
                />
                <CartesianGrid vertical={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}
