import React from "react";
import parseLocalJSON from "@/utils/parseLocalJSON";
import { ChartBarDefault } from "@/components/charts/chart-bar-default";
import { Combobox } from "@/components/shadcn/combobox";

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
    console.log("All Countries:", allCountries);
    const allCountriesTransformed = allCountries.map((country) => ({
        value: country,
        label: country,
    }));

    const unemploymentRates = getUnemploymentRatesByCountry(
        data,
        (country as string) || "United States"
    );

    const percentageChangeOverLastYear =
        unemploymentRates[unemploymentRates.length - 1]?.rate -
        unemploymentRates[unemploymentRates.length - 2]?.rate;

    return (
        <div>
            Unemployment by country
            <div>
                <Combobox
                    initialValue="Select Country..."
                    paramCountry={country as string}
                    dropDownData={allCountriesTransformed}
                    href={{
                        country: country as string,
                    }}
                />
                <ChartBarDefault
                    dataKeyXAxis="year"
                    dataKeyBar="rate"
                    chartData={unemploymentRates}
                    chartConfig={chartConfig}
                    cardTitle={`Unemployment Rate in ${(country as string) || "United States"}`}
                    cardDescription="From 1980 to 2024 in % of the total labor force"
                    percentageChange={percentageChangeOverLastYear}
                />
            </div>
        </div>
    );
}
