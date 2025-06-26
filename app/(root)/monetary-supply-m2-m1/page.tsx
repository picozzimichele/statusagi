import React from "react";
import parseLocalJSON from "@/utils/parseLocalJSON";
import { ChartLineDefault } from "@/components/charts/chart-line-default";
import { ChartConfig } from "@/components/ui/chart";
import { CircleDollarSign, TextSearch, PiggyBank, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import PageTitle from "@/components/title/PageTitle";

export default async function page() {
    // Load the data from a local JSON file
    const dataM2 = await parseLocalJSON("lib/data/M2-24062025.json");
    const dataM1 = await parseLocalJSON("lib/data/M1-24062025.json");

    const isoCountryData = await parseLocalJSON("lib/data/iso-country-list.json");
    const dataTest = await parseLocalJSON("lib/data/inflation-by-country.json");

    console.log("ISO Country Data:", isoCountryData);
    console.log("Test Data:", dataTest);

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
            <PageTitle
                title="Monetary Supply USD"
                svg={<CircleDollarSign className="h-6 w-6 text-orange-500" />}
            />
            <section className="flex w-full h-full gap-4 flex-col md:flex-row">
                <ResizablePanelGroup
                    direction="horizontal"
                    className="gap-4 !flex-col md:!flex-row"
                >
                    {/* M1 Monetary Supply Chart */}
                    <ResizablePanel
                        defaultSize={50}
                        minSize={25}
                        className="!basis-auto md:!basis-0"
                    >
                        <ChartLineDefault
                            chartData={chartDataM1}
                            chartConfig={chartConfigM1}
                            title="M1 Monetary Supply"
                            cardDescription="1959 - April 2025"
                            dataKeyLine="M1SL"
                        />
                    </ResizablePanel>
                    {/* Resizable Handle */}
                    <ResizableHandle withHandle className="hidden md:flex" />
                    {/* M2 Monetary Supply Chart */}
                    <ResizablePanel
                        defaultSize={50}
                        minSize={25}
                        className="!basis-auto md:!basis-0"
                    >
                        <ChartLineDefault
                            chartData={chartDataM2}
                            chartConfig={chartConfigM2}
                            title="M2 Monetary Supply"
                            cardDescription="1959 - April 2025"
                            dataKeyLine="M2SL"
                        />
                    </ResizablePanel>
                </ResizablePanelGroup>
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
                                href="https://fred.stlouisfed.org"
                            >
                                Federal Reserve Bank of St. Louis
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
            {/* Methodology Description */}
            <section className="flex flex-col w-full gap-4">
                <Card className="flex w-full h-full dark:bg-gray-900">
                    <CardHeader>
                        <CardTitle className="text-sm">
                            <p className="flex items-center gap-1">
                                Measuring Monetary Supply
                                <Info className="h-3 w-3 mb-2" />
                            </p>
                        </CardTitle>
                        <CardDescription className="text-xs">
                            <b>M1 money supply</b> includes coins and currency in circulation—the
                            coins and bills that circulate in an economy that are not held by the
                            U.S. Treasury, at the Federal Reserve Bank, or in bank vaults. Closely
                            related to currency are checkable deposits, also known as demand
                            deposits. These are the amounts held in checking accounts. They are
                            called demand deposits or checkable deposits because the banking
                            institution must give the deposit holder his money “on demand” when a
                            check is written or a debit card is used. These items together—currency,
                            and checking accounts in banks—make up the definition of money known as
                            M1, which is measured daily by the Federal Reserve System. Traveler’s
                            checks are also included in M1, but have decreased in use over the
                            recent past.
                            <br />
                            <br />
                            <b>M2 money supply</b> includes everything in M1 but also adds other
                            types of deposits. For example, M2 includes savings deposits in banks,
                            which are bank accounts on which you cannot write a check directly, but
                            from which you can easily withdraw the money at an automatic teller
                            machine or bank. Many banks and other financial institutions also offer
                            a chance to invest in money market funds, where the deposits of many
                            individual investors are pooled together and invested in a safe way,
                            such as short-term government bonds. Another ingredient of M2 is the
                            relatively small (that is, less than about $100,000) certificates of
                            deposit (CDs) or time deposits, which are accounts that the depositor
                            has committed to leaving in the bank for a certain period of time,
                            ranging from a few months to a few years, in exchange for a higher
                            interest rate. In short, all these types of M2 are money that you can
                            withdraw and spend, but which require a greater effort to do so than the
                            items in M1.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </section>
        </div>
    );
}
