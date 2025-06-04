"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

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
    cardTitle,
    cardDescription,
    dataKeyXAxis,
    dataKeyBar,
    chartData,
    chartConfig,
    percentageChange,
    previousPeriod,
}: {
    cardTitle?: string;
    cardDescription?: string;
    dataKeyXAxis: string;
    dataKeyBar: string;
    chartData?: any[];
    chartConfig: ChartConfig;
    percentageChange?: number;
    previousPeriod?: string;
}) {
    return (
        <Card className="flex flex-1 border-0">
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
                <CardDescription>{cardDescription}</CardDescription>
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
                        <ChartTooltip
                            cursor={true}
                            content={
                                <ChartTooltipContent
                                    className="w-[200px]"
                                    hideLabel={false}
                                    valueFormatter={(value) => `${value}%`}
                                />
                            }
                        />
                        <Bar dataKey={dataKeyBar} fill="var(--color-rate)" radius={6}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground hidden md:block text-[8px]"
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
