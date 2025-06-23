import React from "react";
import parseLocalJSON from "@/utils/parseLocalJSON";
import { ChartBarDefault } from "@/components/charts/chart-bar-default";
import { ChartBarMixed } from "@/components/charts/chart-bar-mixed";
import WorldMapInteractive from "@/components/maps/WorldMapInteractive";
import { Combobox } from "@/components/shadcn/combobox";
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import {
    ChartNoAxesColumnIncreasing,
    FolderSearch,
    TrendingUp,
    TextSearch,
    Info,
} from "lucide-react";
import Link from "next/link";

type CountryData = {
    [key: string]: string;
};

type ChartEntry = {
    year: string;
    rate: number;
};

type ISOJsonCountryT = {
    Country: string;
    "Alpha-2": string;
    "Alpha-3": string;
    Numeric: number;
    Latitude?: number;
    Longitude?: number;
};

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function page({ searchParams }: Props) {
    // Load the government debt data from a local JSON file
    const data = await parseLocalJSON("/lib/data/government-debt-by-country.json");
    const isoCountryData = await parseLocalJSON("/lib/data/iso-country-list.json");

    const currentLastDataYear = 2023;
    const startingCountry = "United States";
    const startingSeries = "Central government debt, total (% of GDP)";

    const { country } = await searchParams;
    const { series } = (await searchParams) || startingSeries;

    const seriesSelected = series && series?.length > 0 ? series : startingSeries;

    const chartConfig = {
        rate: {
            label: seriesSelected,
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
    function getDataByCountry(dataset: CountryData[], countryName: string): ChartEntry[] {
        const target = dataset.find((entry) => entry["Country Name"] === countryName);

        if (!target) {
            return [];
        }

        const newTarget = Object.entries(target)
            .slice(4, Object.keys(target).length)
            .filter(([_, rateStr]) => rateStr !== "..")
            .map(([yearStr, rateStr]) => {
                const year = parseInt(yearStr).toString();
                const rate = parseFloat(Number(rateStr.toString().replace(",", ".")).toFixed(1));
                return { year, rate };
            });

        return newTarget;
    }

    function getTopCountries(dataset: CountryData[], year: string, topN?: number) {
        const newDataset = dataset.map((entry) => {
            const countryName = entry["Country Name"];
            const countryAlpha3 = entry["Country Code"];
            const rate2023 = entry["2023 [YR2023]"];

            return {
                country: countryName,
                Alpha3: countryAlpha3,
                rate: parseFloat(Number(rate2023.toString().replace(",", ".")).toFixed(1)),
            };
        });

        console.log("New Dataset:", newDataset);

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

    function mergeDataWithIsoCodes(data: CountryData[], isoCountryData: ISOJsonCountryT[]) {
        const cleanedData = getTopCountries(data, currentLastDataYear.toString());

        const mergedData = cleanedData.map((entry) => {
            const match = isoCountryData.find((isoEntry) => isoEntry["Alpha-3"] === entry.Alpha3);

            if (match) {
                return {
                    Country: entry.country,
                    "Alpha-2": match["Alpha-2"],
                    "Alpha-3": match["Alpha-3"],
                    "2023": isNaN(entry.rate) ? "N/A" : entry.rate,
                };
            } else {
                return {
                    Country: entry.country,
                    "Alpha-2": "No Match",
                    "Alpha-3": entry.Alpha3,
                    "2023": isNaN(entry.rate) ? "N/A" : entry.rate,
                };
            }
        });

        return mergedData;
    }

    // Filtering the data
    const allSeriesNames = getAllSeriesNames(data);
    const filteredData = data.filter((entry) => entry["Series Name"] === seriesSelected);
    const allCountries = getAllCountries(filteredData);

    const allSeriesNamesTransformed = allSeriesNames.map((series) => ({
        value: series,
        label: series,
    }));

    const allCountriesTransformed = allCountries.map((country) => ({
        value: country,
        label: country,
    }));

    const dataCurrentCountry = getDataByCountry(
        filteredData,
        (country as string) || (startingCountry as string)
    );

    const beginningYear = dataCurrentCountry[0]?.year || "1975";
    const previousYear = dataCurrentCountry[dataCurrentCountry.length - 2]?.year || "2023";
    const endingYear = dataCurrentCountry[dataCurrentCountry.length - 1]?.year || "2024";

    const percentageChangeOverLastYear =
        dataCurrentCountry[dataCurrentCountry.length - 1]?.rate -
        dataCurrentCountry[dataCurrentCountry.length - 2]?.rate;

    const topCountries = getTopCountries(filteredData, currentLastDataYear.toString(), 10);

    const mapData = mergeDataWithIsoCodes(data, isoCountryData);

    return (
        <div className="flex w-full flex-col items-start gap-4 p-4 max-w-7xl mx-auto">
            {" "}
            {/* Title and section header */}
            <div className="flex w-full">
                <p className="font-medium">Debt rate by country</p>
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
                    {dataCurrentCountry.length === 0 && (
                        <Card className="flex w-full">
                            <CardHeader>
                                <CardTitle>
                                    No debt data found for the selected country {country}.
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
                    {dataCurrentCountry.length > 0 && (
                        <ChartBarDefault
                            dataKeyXAxis="year"
                            dataKeyBar="rate"
                            chartData={dataCurrentCountry}
                            chartConfig={chartConfig}
                            cardTitle={`Debt Rate in ${(country as string) || "United States"}`}
                            cardDescription={`From ${beginningYear} to ${endingYear} in % of GDP`}
                        />
                    )}
                </div>
                <div className="flex flex-col items-start gap-2 w-full lg:w-1/4 justify-between">
                    {/* First Card */}
                    <Card className="flex w-full">
                        <CardHeader>
                            <CardTitle>
                                {/* TODO handle NaN Case */}
                                {dataCurrentCountry.length === 0 && "No data available"}
                                {dataCurrentCountry.length > 0 && percentageChangeOverLastYear && (
                                    <span>
                                        Trending {percentageChangeOverLastYear > 0 ? "up" : "down"}️
                                        by {percentageChangeOverLastYear.toFixed(1)}%
                                    </span>
                                )}
                            </CardTitle>
                            <CardDescription>
                                {dataCurrentCountry.length > 0 &&
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
                        description={`By debt level in ${currentLastDataYear}`}
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
                        <CardTitle>Global Debt Overview</CardTitle>
                        <CardDescription>
                            Interactive world map showing Debt levels by country{" "}
                            {currentLastDataYear}
                        </CardDescription>
                    </CardHeader>
                    {/* Here you would include your WorldMapInteractive component */}
                    <div className="flex w-[90%] h-full mx-auto">
                        <WorldMapInteractive
                            countryData={mapData}
                            labelName={"Debt Level"}
                            legend={{
                                show: true,
                                legendRate: [100, 150, 170],
                            }}
                            rateYear="2023"
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
                                Central government debt, total (% of GDP)
                                <Info className="h-3 w-3 mb-2" />
                            </p>
                        </CardTitle>
                        <CardDescription className="text-xs">
                            General government debt is the gross debt of the general government as a
                            percentage of GDP. Debt is calculated as the sum of the following
                            liability categories where applicable: currency and deposits; debt
                            securities, loans; insurance, pensions and standardised guarantee
                            schemes, and other accounts payable.
                            <br />
                            <br /> A key indicator for the sustainability of government finance,
                            changes in government debt over time primarily reflect the impact of
                            past government deficits. This indicator is measured as a percentage of
                            GDP.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </section>
        </div>
    );
}
