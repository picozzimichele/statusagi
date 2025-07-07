import { FolderSearch } from "lucide-react";
import React from "react";
import { ChartBarDefault } from "../charts/chart-bar-default";
import { Card, CardHeader, CardTitle, CardDescription, CardAction } from "../ui/card";
import { ChartEntry, CountryData } from "@/types/alltypes";
import { getDataById, getDataByIdFiltered } from "@/lib/actions/data.actions";
import { capitalizeFirstLetter } from "@/utils/utilsFunctions";

export default async function ChartBarPage({
    countryParam,
    seriesParam,
    seriesId,
    startingSeries,
    startingCountry,
    chartTitle,
}: {
    countryParam?: string;
    seriesParam?: string;
    seriesId: string;
    startingSeries?: string;
    startingCountry?: string;
    chartTitle: string;
}) {
    const country = countryParam || startingCountry;
    const series = seriesParam || startingSeries;
    const seriesSelected = series && series?.length > 0 ? series : startingSeries;

    const chartConfig = {
        rate: {
            label: seriesSelected,
            color: "#BDDDE4",
        },
    };

    // Load the government debt data from MongoDB
    // Filtering the data by country and series in MongoDB directly
    // If no country is provided, it will use the default country
    // If no series is provided, it will use the default series
    const dataMongoDB = await getDataByIdFiltered({
        dataId: seriesId,
        country: country,
        seriesName: series,
    });
    const dataFiltered = dataMongoDB.entries as CountryData[];

    function getCleanData(dataset: CountryData[]): ChartEntry[] {
        const target = dataset[0];

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

    const dataCurrentCountry = getCleanData(dataFiltered);

    // Filtering the data
    const isRateSeries = seriesSelected === "Central government debt, total (% of GDP)";

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
                            No {chartTitle} data found for the selected country {country}.
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
                    cardTitle={`${capitalizeFirstLetter(chartTitle)} Rate in ${
                        (country as string) || "United States"
                    }`}
                    cardDescription={`From ${beginningYear} to ${endingYear}`}
                    isPercentage={isRateSeries}
                />
            )}
        </div>
    );
}
