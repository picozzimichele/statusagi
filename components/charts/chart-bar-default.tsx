"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartDataExample = [
    { month: "1980", desktop: 7.175 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
];

const chartConfigExample = {
    desktop: {
        label: "Desktop",
        color: "#60a5fa",
    },
} satisfies ChartConfig;

export function ChartBarDefault({
    dataKeyXAxis,
    dataKeyBar,
    chartData,
    chartConfig,
}: {
    dataKeyXAxis: string;
    dataKeyBar: string;
    chartData?: any[];
    chartConfig: ChartConfig;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bar Chart</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            //the dataKey prop is used to specify which key in the data objects should be used for the x-axis
                            dataKey={dataKeyXAxis}
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 4)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey={dataKeyBar} fill="var(--color-desktop)" radius={6} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}
