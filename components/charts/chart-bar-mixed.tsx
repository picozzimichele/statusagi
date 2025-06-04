"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A mixed bar chart";

const chartDataExample = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
    visitors: {
        label: "Unemployment Rate",
    },
    chrome: {
        label: "Chrome",
        color: "var(--chart-1)",
    },
    safari: {
        label: "Safari",
        color: "var(--chart-2)",
    },
    firefox: {
        label: "Firefox",
        color: "var(--chart-3)",
    },
    edge: {
        label: "Edge",
        color: "var(--chart-4)",
    },
    other: {
        label: "Other",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig;

export function ChartBarMixed({
    title,
    description,
    chartData,
}: {
    title?: string;
    description?: string;
    chartData: any[];
}) {
    return (
        <Card className="flex w-full h-full flex-1 border-0">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex overflow-scroll scrollbar-hide">
                <ChartContainer className="flex-1 flex" config={chartConfig}>
                    <BarChart
                        className="flex-1 h-full flex"
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 0,
                        }}
                    >
                        <YAxis
                            dataKey="country"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            hide
                        />
                        <XAxis dataKey="rate" type="number" hide={false} />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    hideLabel={false}
                                    valueFormatter={(value) => `${value}%`}
                                />
                            }
                        />
                        <Bar dataKey="rate" layout="vertical" radius={5}>
                            <LabelList
                                dataKey="country"
                                position="insideLeft"
                                offset={8}
                                className="text-[8px] fill-white dark:fill-black"
                            />
                            <LabelList
                                className="fill-foreground text-[8px]"
                                dataKey="rate"
                                position="right"
                                offset={8}
                                formatter={(value: number) => `${value}%`}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
