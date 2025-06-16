import React from "react";
import parseLocalJSON from "@/utils/parseLocalJSON";
import { ChartNoAxesColumnIncreasing, FolderSearch } from "lucide-react";
import { Combobox } from "@/components/shadcn/combobox";
import { ChartBarDefault } from "@/components/charts/chart-bar-default";
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";

type CountryData = {
    [key: string]: string;
};

type InflationEntry = {
    year: number;
    rate: number;
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

    function getInflationRateByCountry(data: CountryData[], country: string): InflationEntry[] {
        const basicData = data.filter((entry) => entry["Country Name"] === country);

        const result: InflationEntry[] = [];

        const transformedData = Object.entries(basicData[0])
            .filter(([key]) => /^\d{4} \[YR\d{4}\]$/.test(key))
            .map(([key, value]) => {
                const year = parseInt(key.slice(0, 4), 10);
                const rate = parseFloat(value.replace(",", "."));
                return { year, rate: Math.round(rate * 100) / 100 }; // round to 2 decimal places
            });

        if (transformedData.length > 0) {
            result.push(...transformedData);
        }

        return result;
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
                    {inlationRateCurrentCountry.length > 0 && (
                        <ChartBarDefault
                            dataKeyXAxis="year"
                            dataKeyBar="rate"
                            chartData={inlationRateCurrentCountry}
                            chartConfig={chartConfig}
                            cardTitle={`Unemployment Rate in ${
                                (country as string) || "United States"
                            }`}
                            cardDescription={`From ${1975} to ${2024} in % of the total labor force`}
                        />
                    )}
                </div>
            </section>
        </div>
    );
}
