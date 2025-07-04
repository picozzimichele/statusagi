import { FolderSearch } from "lucide-react";
import React from "react";
import { ChartBarDefault } from "../charts/chart-bar-default";
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "../ui/card";
import { ChartEntry, CountryData } from "@/types/alltypes";
import { getDataById } from "@/lib/actions/data.actions";
import { transformDocToArray } from "@/utils/utilsFunctions";

export default async function ChartBarPage({
    countryParam,
    seriesParam,
}: {
    countryParam?: string;
    seriesParam?: string;
}) {
    // Load the government debt data from MongoDB
    const dataMongoDB = await getDataById({ dataId: "6867d5ba1812f46bf215a5e2" });
    const dataStringify = JSON.parse(JSON.stringify(dataMongoDB));
    const transformedData = transformDocToArray(dataStringify);
    const data = transformedData as CountryData[];

    const currentLastDataYear = 2023;
    const startingCountry = "United States";
    const startingSeries = "Central government debt, total (% of GDP)";

    const country = countryParam;
    const series = seriesParam || startingSeries;

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

    // Filtering the data
    const allSeriesNames = getAllSeriesNames(data);
    const filteredData = data.filter((entry) => entry["Series Name"] === seriesSelected);
    const allCountries = getAllCountries(filteredData);
    const isRateSeries = seriesSelected === "Central government debt, total (% of GDP)";

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

    return (
        <div className="flex flex-1 lg:max-w-3/4 shrink-0">
            {/* If no unemployment data is found for the selected country */}
            {dataCurrentCountry.length === 0 && (
                <Card className="flex w-full">
                    <CardHeader>
                        <CardTitle>
                            No debt data found for the selected country {country}.
                        </CardTitle>
                        <CardDescription>
                            Try a new seach by selectin another country from the available list
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
                    isPercentage={isRateSeries}
                />
            )}
        </div>
    );
}
