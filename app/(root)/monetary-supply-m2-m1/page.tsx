import React from "react";
import parseLocalJSON from "@/utils/parseLocalJSON";
import { ChartLineDefault } from "@/components/charts/chart-line-default";
import { ChartConfig } from "@/components/ui/chart";
import { CircleDollarSign, TextSearch, PiggyBank } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function page() {
    // Load the data from a local JSON file
    const dataM2 = await parseLocalJSON("/lib/data/M2-24062025.json");
    const dataM1 = await parseLocalJSON("/lib/data/M1-24062025.json");

    const chartDataM2 = dataM2.map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
        M2SL: parseFloat(item.M2SL.replace(",", ".")),
    }));

    const chartDataM1 = dataM1.map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
        M1SL: parseFloat(item.M1SL.replace(",", ".")),
    }));

    const chartConfigM2 = {
        M2SL: {
            label: "M2 Monetary Supply",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig;

    const chartConfigM1 = {
        M1SL: {
            label: "M1 Monetary Supply",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig;

    return (
        <div className="flex w-full flex-col items-start gap-4 p-4 max-w-7xl mx-auto">
            {/* Title and section header */}
            <div className="flex w-full">
                <p className="font-medium">Monetary Supply USD</p>
                <CircleDollarSign className="ml-2 h-6 w-6 text-orange-500" />
            </div>
            <section className="flex w-full h-full gap-4 flex-col lg:flex-row">
                {/* M1 Monetary Supply Chart */}
                <ChartLineDefault
                    chartData={chartDataM1}
                    chartConfig={chartConfigM1}
                    title="M1 Monetary Supply"
                    cardDescription="1959 - April 2025"
                    dataKeyLine="M1SL"
                />
                {/* M2 Monetary Supply Chart */}
                <ChartLineDefault
                    chartData={chartDataM2}
                    chartConfig={chartConfigM2}
                    title="M2 Monetary Supply"
                    cardDescription="1959 - April 2025"
                    dataKeyLine="M2SL"
                />
            </section>
            <section className="flex w-full h-full gap-4 flex-col lg:flex-row">
                {/* Source Card */}
                <Card className="flex w-full">
                    <CardHeader>
                        <CardTitle>Used Data Source</CardTitle>
                        <CardDescription>
                            <Link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                                href="https://databank.worldbank.org/source/world-development-indicators"
                            >
                                World Bank Group
                            </Link>
                        </CardDescription>
                        <CardAction>
                            <TextSearch className="h-4 w-4" />
                        </CardAction>
                    </CardHeader>
                </Card>
                {/* M1 Description */}
                <Card className="flex w-full">
                    <CardHeader>
                        <CardTitle>M1 Monetary Supply</CardTitle>
                        <CardDescription>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Badge>Coins</Badge>
                                <Badge>Bills</Badge>
                                <Badge>Bank Reserves</Badge>
                                <Badge>Demand Deposits</Badge>
                            </div>
                        </CardDescription>
                        <CardAction>
                            <PiggyBank className="h-4 w-4" />
                        </CardAction>
                    </CardHeader>
                </Card>
                {/* M2 Description */}
                <Card className="flex w-full">
                    <CardHeader>
                        <CardTitle>M2 Monetary Supply</CardTitle>
                        <CardDescription>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="secondary">M1</Badge>
                                <Badge>Savings</Badge>
                                <Badge>Time & Small time deposits</Badge>
                                <Badge>Certificates of Deposit</Badge>
                            </div>
                        </CardDescription>
                        <CardAction>
                            <PiggyBank className="h-4 w-4" />
                        </CardAction>
                    </CardHeader>
                </Card>
            </section>
        </div>
    );
}
