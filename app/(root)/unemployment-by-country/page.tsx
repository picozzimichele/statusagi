import React from "react";
import parseLocalJSON from "@/utils/parseLocalJSON";
import { ChartBarDefault } from "@/components/charts/chart-bar-default";
import { Combobox } from "@/components/shadcn/combobox";
import { ChartNoAxesColumnIncreasing, TrendingUp, TextSearch, FolderSearch } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import Link from "next/link";
import { ChartBarMixed } from "@/components/charts/chart-bar-mixed";
import WorldMapInteractive from "@/components/maps/WorldMapInteractive";

type CountryData = {
    [key: string]: string;
};

type UnemploymentEntry = {
    year: string;
    rate: number;
};

type UnemploymentEntryISO = {
    [key: string]: string;
    ISO: string;
    Country: string;
    "2024": string;
};

type MetadataEntry = {
    Country: string;
    "Alpha-2": string;
    "Alpha-3": string;
    Numeric: number;
    Latitude?: number;
    Longitude?: number;
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
    const data = await parseLocalJSON("/lib/data/unemployment-by-country.json");
    const isoCountryData = await parseLocalJSON("/lib/data/iso-country-list.json");
    const { country } = await searchParams;
    const currentLastDataYear = 2024;

    const chartConfig = {
        rate: {
            label: "Unemployment Rate",
            color: "#BDDDE4",
        },
    };

    function getAllCountries(data: CountryData[]): string[] {
        return data.map((entry) => entry.Country).filter(Boolean);
    }

    // Function to extract unemployment rates for a specific country
    function getUnemploymentRatesByCountry(
        dataset: CountryData[],
        countryName: string
    ): UnemploymentEntry[] {
        const target = dataset.find((entry) => entry.Country === countryName);

        if (!target) {
            return [];
        }

        const result: UnemploymentEntry[] = [];

        for (const key in target) {
            // Check if key is a year and value is a valid number
            if (
                /^\d{4}$/.test(key) &&
                parseInt(key) <= 2024 &&
                target[key] &&
                !isNaN(Number(target[key])) &&
                target[key] !== "NA"
            ) {
                result.push({
                    year: key,
                    rate: parseFloat(Number(target[key]).toFixed(1)),
                });
            }
        }

        return result;
    }

    // Function to get the latest unemployment rates for all countries in 2024
    function getTopCountriesByUnemploymentRate(
        dataset: CountryData[],
        topN: number = 10
    ): { country: string; rate: number }[] {
        const countryRates: { country: string; rate: number }[] = [];
        dataset.forEach((entry) => {
            const countryName = entry.Country;
            for (const key in entry) {
                // Check if key is a year and value is a valid number
                if (
                    /^\d{4}$/.test(key) &&
                    parseInt(key) === currentLastDataYear &&
                    entry[key] &&
                    !isNaN(Number(entry[key])) &&
                    entry[key] !== "NA"
                ) {
                    countryRates.push({
                        country: countryName,
                        rate: parseFloat(Number(entry[key]).toFixed(1)),
                    });
                }
            }
        });
        // Sort by rate in descending order and take the top N
        return countryRates.sort((a, b) => b.rate - a.rate).slice(0, topN);
    }

    function mergeUnemploymentData({
        countryData,
        isoCountryData,
    }: {
        countryData: UnemploymentEntryISO[];
        isoCountryData: MetadataEntry[];
    }) {
        const returnMergedData = countryData.map((entry) => {
            const match = isoCountryData.find((isoEntry) => isoEntry["Alpha-3"] === entry.ISO);

            if (match) {
                return {
                    Country: match.Country,
                    "Alpha-2": match["Alpha-2"],
                    "Alpha-3": match["Alpha-3"],
                    "2024": entry["2024"] || null, // Use 2024 data or null if not available
                } as MergedEntry;
            } else {
                return {
                    Country: entry.Country,
                    "Alpha-2": "No Match",
                    "Alpha-3": entry.ISO,
                    "2024": entry["2024"] || null, // Use 2024 data or null if not available
                } as MergedEntry;
            }
        });

        return returnMergedData;
    }

    const allCountries = getAllCountries(data);
    const allCountriesTransformed = allCountries.map((country) => ({
        value: country,
        label: country,
    }));

    const displayWorldCountryData = mergeUnemploymentData({
        countryData: data as UnemploymentEntryISO[],
        isoCountryData: isoCountryData as MetadataEntry[],
    });

    const unemploymentRates = getUnemploymentRatesByCountry(
        data,
        (country as string) || "United States"
    );
    // Get the top 10 countries by unemployment rate
    const topCountries = getTopCountriesByUnemploymentRate(data, 10);

    const beginningYear = unemploymentRates[0]?.year || "1980";
    const previousYear = unemploymentRates[unemploymentRates.length - 2]?.year || "2023";
    const endingYear = unemploymentRates[unemploymentRates.length - 1]?.year || "2024";

    const percentageChangeOverLastYear =
        unemploymentRates[unemploymentRates.length - 1]?.rate -
        unemploymentRates[unemploymentRates.length - 2]?.rate;

    return (
        <div className="flex flex-col items-start gap-4 p-4 max-w-7xl mx-auto">
            {/* Title and section header */}
            <div className="flex w-full">
                <p className="font-medium">Unemployment rate by country</p>
                <ChartNoAxesColumnIncreasing className="ml-2 h-6 w-6 text-orange-500" />
            </div>
            {/* Country Selection */}
            <div className="flex w-full">
                <Combobox
                    initialValue="Select Country..."
                    paramCountry={country as string}
                    dropDownData={allCountriesTransformed}
                    href={{
                        country: country as string,
                    }}
                />
            </div>
            {/* Chart */}
            <section className="flex w-full gap-4 flex-col lg:flex-row">
                <div className="flex flex-1 lg:max-w-3/4 shrink-0">
                    {/* If no unemployment data is found for the selected country */}
                    {unemploymentRates.length === 0 && (
                        <Card className="flex w-full">
                            <CardHeader>
                                <CardTitle>
                                    No unemployment data found for the selected country {country}.
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
                    {unemploymentRates.length > 0 && (
                        <ChartBarDefault
                            dataKeyXAxis="year"
                            dataKeyBar="rate"
                            chartData={unemploymentRates}
                            chartConfig={chartConfig}
                            cardTitle={`Unemployment Rate in ${
                                (country as string) || "United States"
                            }`}
                            cardDescription={`From ${beginningYear} to ${endingYear} in % of the total labor force`}
                        />
                    )}
                </div>
                <div className="flex flex-col items-start gap-2 w-full lg:w-1/4 justify-between">
                    {/* First Card */}
                    <Card className="flex w-full">
                        <CardHeader>
                            <CardTitle>
                                {/* TODO handle NaN Case */}
                                {unemploymentRates.length === 0 && "No data available"}
                                {unemploymentRates.length > 0 && percentageChangeOverLastYear && (
                                    <span>
                                        Trending {percentageChangeOverLastYear > 0 ? "up" : "down"}️
                                        by {percentageChangeOverLastYear.toFixed(1)}%
                                    </span>
                                )}
                            </CardTitle>
                            <CardDescription>
                                {unemploymentRates.length > 0 &&
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
                                    href="https://www.imf.org/external/datamapper/LUR@WEO/OEMDC/ADVEC/WEOWORLD"
                                >
                                    International Monetary Fund 2025
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
                        description={`By unemployment rate in ${currentLastDataYear}`}
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
                        <CardTitle>Global Unemployment Overview</CardTitle>
                        <CardDescription>
                            Interactive world map showing unemployment rates by country{" "}
                            {currentLastDataYear}
                        </CardDescription>
                    </CardHeader>
                    {/* Here you would include your WorldMapInteractive component */}
                    <div className="flex w-[90%] h-full mx-auto">
                        <WorldMapInteractive
                            countryData={displayWorldCountryData}
                            labelName={"Unemployment Rate"}
                            legend={{ show: true }}
                        />
                    </div>
                </Card>
            </section>
        </div>
    );
}
