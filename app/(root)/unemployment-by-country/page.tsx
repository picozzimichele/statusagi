import React from "react";
import parseLocalJSON from "@/utils/parseLocalJSON";
import { ChartBarDefault } from "@/components/charts/chart-bar-default";
import { Combobox } from "@/components/shadcn/combobox";
import { ChartNoAxesColumnIncreasing } from "lucide-react";

type CountryData = {
    [key: string]: string;
};

type UnemploymentEntry = {
    year: string;
    rate: number;
};

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
    // Load the unemployment data from a local JSON file
    const data = await parseLocalJSON("/lib/data/unemployment-by-country.json");
    const { country } = await searchParams;

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
                    rate: parseFloat(Number(target[key]).toFixed(2)),
                });
            }
        }

        return result;
    }

    const allCountries = getAllCountries(data);
    const allCountriesTransformed = allCountries.map((country) => ({
        value: country,
        label: country,
    }));

    const unemploymentRates = getUnemploymentRatesByCountry(
        data,
        (country as string) || "United States"
    );
    //TODO If no unemployment rates are found for the specified country, return an empty chart

    const beginningYear = unemploymentRates[0]?.year || "1980";
    const previousYear = unemploymentRates[unemploymentRates.length - 2]?.year || "2023";
    const endingYear = unemploymentRates[unemploymentRates.length - 1]?.year || "2024";

    const percentageChangeOverLastYear =
        unemploymentRates[unemploymentRates.length - 1]?.rate -
        unemploymentRates[unemploymentRates.length - 2]?.rate;

    return (
        <div className="flex flex-col items-start gap-4 p-4 bg-green-50 max-w-7xl mx-auto">
            {/* Title and section header */}
            <div className="flex w-full bg-green-100">
                <p className="font-medium">Unemployment rate by country</p>
                <ChartNoAxesColumnIncreasing className="ml-2 h-6 w-6 text-orange-500" />
            </div>
            <div>
                <Combobox
                    initialValue="Select Country..."
                    paramCountry={country as string}
                    dropDownData={allCountriesTransformed}
                    href={{
                        country: country as string,
                    }}
                />
                {unemploymentRates.length === 0 && (
                    <p className="text-red-500">
                        No unemployment data found for the selected country.
                    </p>
                )}
                {unemploymentRates.length > 0 && (
                    <ChartBarDefault
                        dataKeyXAxis="year"
                        dataKeyBar="rate"
                        chartData={unemploymentRates}
                        chartConfig={chartConfig}
                        cardTitle={`Unemployment Rate in ${(country as string) || "United States"}`}
                        cardDescription={`From ${beginningYear} to ${endingYear} in % of the total labor force`}
                        percentageChange={percentageChangeOverLastYear}
                        previousPeriod={`${previousYear} to ${endingYear}`}
                    />
                )}
            </div>
        </div>
    );
}
