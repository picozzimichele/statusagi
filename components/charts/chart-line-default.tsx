"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
import { formatLargeNumber } from "@/utils/utilsFunctions";

export const description = "A line chart";

export function ChartLineDefault({
    chartData,
    chartConfig,
    title = "M2 Monetary Supply",
    cardDescription,
    dataKeyLine = "M2SL",
}: {
    chartData: any[];
    chartConfig: ChartConfig;
    title: string;
    cardDescription?: string;
    dataKeyLine?: string;
}) {
    return (
        <Card className="flex flex-1 border-0">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 20,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(value.length - 4)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value}
                            label={{
                                value: "Billions of Dollars",
                                angle: -90,
                                position: "insideLeft",
                                offset: -10,
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    className="w-[200px]"
                                    valueFormatter={(value) => `${value} Bil $`}
                                />
                            }
                        />
                        <Line
                            dataKey={dataKeyLine}
                            type="natural"
                            stroke="var(--chart-1)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
