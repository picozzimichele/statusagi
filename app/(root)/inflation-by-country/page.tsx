import React from "react";
import parseLocalJSON from "@/utils/parseLocalJSON";
import {
    ChartNoAxesColumnIncreasing,
    FolderSearch,
    Info,
    TextSearch,
    TrendingUp,
} from "lucide-react";
import { Combobox } from "@/components/shadcn/combobox";
import { ChartBarDefault } from "@/components/charts/chart-bar-default";
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { ChartBarMixed } from "@/components/charts/chart-bar-mixed";
import Link from "next/link";
import WorldMapInteractive from "@/components/maps/WorldMapInteractive";

type CountryData = {
    [key: string]: string;
};

type MetadataEntry = {
    Country: string;
    "Alpha-2": string;
    "Alpha-3": string;
    Numeric: number;
    Latitude?: number;
    Longitude?: number;
};

type ChartEntry = {
    year: string;
    rate: number;
};

type MergedEntry = {
    Country: string;
    "Alpha-2": string;
    "Alpha-3": string;
    "2024": string | null;
};

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
    // Load the unemployment data from a local JSON file
    const data = await parseLocalJSON("/lib/data/inflation.json");
    const isoCountryData = await parseLocalJSON("/lib/data/iso-country-list.json");
    const { country } = await searchParams;
    const { series } = await searchParams;
    const currentLastDataYear = 2024;
    const startingCountry = "United States";
    const startingName = "Inflation, consumer prices (annual %)";

    const chartConfig = {
        rate: {
            label: "Inflation Rate",
            color: "#BDDDE4",
        },
    };

    // This gets all the series names from the data
    function getAllSeriesNames(data: CountryData[]): string[] {
        return Array.from(new Set(data.map((entry) => entry["Series Name"]))).filter(Boolean);
    }

    // This is needed for the dropdown to have the list of all countries
    function getAllCountries(data: CountryData[]): string[] {
        return data.map((entry) => entry["Country Name"]).filter(Boolean);
    }

    // Function to extract unemployment rates for a specific country
    function getInflationRateByCountry(dataset: CountryData[], countryName: string): ChartEntry[] {
        const target = dataset.find((entry) => entry["Country Name"] === countryName);

        if (!target) {
            return [];
        }

        const newTarget = Object.entries(target)
            .slice(4, Object.keys(target).length - 1)
            .filter(([_, rateStr]) => rateStr !== "..")
            .map(([yearStr, rateStr]) => {
                const year = parseInt(yearStr).toString();
                const rate = parseFloat(Number(rateStr.replace(",", ".")).toFixed(1));
                return { year, rate };
            });

        return newTarget;
    }

    function getTopCountries(dataset: CountryData[], year: string, topN?: number) {
        const newDataset = dataset.map((entry) => {
            const countryName = entry["Country Name"];
            const countryAlpha3 = entry["Country Code"];
            const rate2024 = entry["2024 [YR2024]"];

            return {
                country: countryName,
                Alpha3: countryAlpha3,
                rate: parseFloat(Number(rate2024.replace(",", ".")).toFixed(1)),
            };
        });

        // Return early if no topN is specified or is less than or equal to 0
        if (!topN || topN <= 0) {
            return newDataset;
        }

        const sorted = newDataset
            .filter((entry) => !isNaN(entry.rate))
            .sort((a, b) => b.rate - a.rate)
            .slice(0, topN);

        return sorted;
    }

    function mergeDataWithIsoCodes(data: CountryData[], isoCountryData: MetadataEntry[]) {
        const cleanedData = getTopCountries(data, currentLastDataYear.toString());

        const mergedData = cleanedData.map((entry) => {
            const match = isoCountryData.find((isoEntry) => isoEntry["Alpha-3"] === entry.Alpha3);

            if (match) {
                return {
                    Country: entry.country,
                    "Alpha-2": match["Alpha-2"],
                    "Alpha-3": match["Alpha-3"],
                    "2024": isNaN(entry.rate) ? "N/A" : entry.rate,
                };
            } else {
                return {
                    Country: entry.country,
                    "Alpha-2": "No Match",
                    "Alpha-3": entry.Alpha3,
                    "2024": isNaN(entry.rate) ? "N/A" : entry.rate,
                };
            }
        });

        console.log("Merged Data", mergedData);
        return mergedData;
    }

    // Filtering the data
    const allSeriesNames = getAllSeriesNames(data);
    const filteredData = data.filter((entry) => entry["Series Name"] === allSeriesNames[0]);
    const allCountries = getAllCountries(filteredData);

    const allSeriesNamesTransformed = allSeriesNames.map((series) => ({
        value: series,
        label: series,
    }));

    const allCountriesTransformed = allCountries.map((country) => ({
        value: country,
        label: country,
    }));

    const inlationRateCurrentCountry = getInflationRateByCountry(
        filteredData,
        (country as string) || (startingCountry as string)
    );

    const beginningYear = inlationRateCurrentCountry[0]?.year || "1975";
    const previousYear =
        inlationRateCurrentCountry[inlationRateCurrentCountry.length - 2]?.year || "2023";
    const endingYear =
        inlationRateCurrentCountry[inlationRateCurrentCountry.length - 1]?.year || "2024";

    const percentageChangeOverLastYear =
        inlationRateCurrentCountry[inlationRateCurrentCountry.length - 1]?.rate -
        inlationRateCurrentCountry[inlationRateCurrentCountry.length - 2]?.rate;

    const topCountries = getTopCountries(data, currentLastDataYear.toString(), 10);

    const mapData = mergeDataWithIsoCodes(data, isoCountryData);

    return (
        <div className="flex w-full flex-col items-start gap-4 p-4 max-w-7xl mx-auto">
            {" "}
            {/* Title and section header */}
            <div className="flex w-full">
                <p className="font-medium">Inflation rate by country</p>
                <ChartNoAxesColumnIncreasing className="ml-2 h-6 w-6 text-orange-500" />
            </div>
            {/* Country Selection */}
            <div className="flex w-full gap-3">
                <Combobox
                    initialValue="Select Country..."
                    currentParam={country as string}
                    dropDownData={allCountriesTransformed}
                    selectedParamName="country"
                    href={{
                        country: country as string,
                        series: series as string,
                    }}
                />
                <Combobox
                    initialValue="Select a series..."
                    currentParam={series as string}
                    dropDownData={allSeriesNamesTransformed}
                    selectedParamName="series"
                    href={{
                        country: country as string,
                        series: series as string,
                    }}
                />
            </div>
            {/* Chart */}
            <section className="flex w-full gap-4 flex-col lg:flex-row">
                <div className="flex flex-1 lg:max-w-3/4 shrink-0">
                    {/* If no unemployment data is found for the selected country */}
                    {inlationRateCurrentCountry.length === 0 && (
                        <Card className="flex w-full">
                            <CardHeader>
                                <CardTitle>
                                    No inflation data found for the selected country {country}.
                                </CardTitle>
                                <CardDescription>
                                    Try a new seach by selectin another country from the available
                                    list
                                </CardDescription>
                                <CardAction>
                                    <FolderSearch className="h-4 w-4" />
                                </CardAction>
                            </CardHeader>
                        </Card>
                    )}
                    {/* Display the chart */}
                    {inlationRateCurrentCountry.length > 0 && (
                        <ChartBarDefault
                            dataKeyXAxis="year"
                            dataKeyBar="rate"
                            chartData={inlationRateCurrentCountry}
                            chartConfig={chartConfig}
                            cardTitle={`Inflation Rate in ${
                                (country as string) || "United States"
                            }`}
                            cardDescription={`From ${beginningYear} to ${endingYear} in % of Consumer Prices`}
                        />
                    )}
                </div>
                <div className="flex flex-col items-start gap-2 w-full lg:w-1/4 justify-between">
                    {/* First Card */}
                    <Card className="flex w-full">
                        <CardHeader>
                            <CardTitle>
                                {/* TODO handle NaN Case */}
                                {inlationRateCurrentCountry.length === 0 && "No data available"}
                                {inlationRateCurrentCountry.length > 0 &&
                                    percentageChangeOverLastYear && (
                                        <span>
                                            Trending{" "}
                                            {percentageChangeOverLastYear > 0 ? "up" : "down"}️ by{" "}
                                            {percentageChangeOverLastYear.toFixed(1)}%
                                        </span>
                                    )}
                            </CardTitle>
                            <CardDescription>
                                {inlationRateCurrentCountry.length > 0 &&
                                    `Compared to the previous period: ${previousYear} to ${endingYear}`}
                            </CardDescription>
                            <CardAction>
                                <TrendingUp className="h-4 w-4" />
                            </CardAction>
                        </CardHeader>
                    </Card>
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
                    {/* Top Countries Chart */}
                    <ChartBarMixed
                        title="Top 10 Countries"
                        description={`By inflation rate in ${currentLastDataYear}`}
                        chartData={topCountries.map((entry, index) => ({
                            country: entry.country,
                            rate: entry.rate,
                            fill: `var(--chart-3)`, // Assuming you have CSS variables for colors
                        }))}
                    />
                </div>
            </section>
            {/* World Map */}
            <section className="flex flex-col w-full gap-4">
                <Card className="flex w-full h-full">
                    <CardHeader>
                        <CardTitle>Global Inflation Overview</CardTitle>
                        <CardDescription>
                            Interactive world map showing Inflation rates by country{" "}
                            {currentLastDataYear}
                        </CardDescription>
                    </CardHeader>
                    {/* Here you would include your WorldMapInteractive component */}
                    <div className="flex w-[90%] h-full mx-auto">
                        <WorldMapInteractive
                            countryData={mapData}
                            labelName={"Inflation Rate"}
                            legend={{
                                show: true,
                            }}
                        />
                    </div>
                </Card>
            </section>
            {/* Methodology Description */}
            <section className="flex flex-col w-full gap-4">
                <Card className="flex w-full h-full dark:bg-gray-900">
                    <CardHeader>
                        <CardTitle className="text-sm">
                            <p className="flex items-center gap-1">
                                Inflation Rate Consumer Price Index (CPI)
                                <Info className="h-3 w-3 mb-2" />
                            </p>
                        </CardTitle>
                        <CardDescription className="text-xs">
                            The Consumer Price Index (CPI), calculated by the Bureau of Labor
                            Statistics (BLS), measures the monthly change in price for a figurative
                            basket of goods and services. These items can change over time. CPI is a
                            weighted average of prices and is representative of aggregate consumer
                            spending. It is used as a metric for inflation and deflation. The CPI
                            accounts for <b>substitution effects—consumers</b>&apos; tendency to
                            shift spending away from products and product categories that have grown
                            relatively more expensive with time. <br />
                            <br />
                            In our opinion CPI is only a fraction of the whole picture of real
                            inflation and might be understated compared to reality. It still remains
                            a valuable indicator of the general price level and inflation trends in
                            an economy.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </section>
        </div>
    );
}
