import React from "react";
import parseLocalJSON from "@/utils/parseLocalJSON";
import { ChartBarDefault } from "@/components/charts/chart-bar-default";
import { Combobox } from "@/components/shadcn/combobox";
import { calculatePercentageChange } from "@/utils/utilsFunctions";

type CountryData = {
    [key: string]: string;
};

type UnemploymentEntry = {
    year: string;
    rate: number;
};

export default async function Page() {
    const data = await parseLocalJSON("/lib/data/unemployment-by-country.json");
    //console.log("Unemployment by Country Data:", data);

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

    const unemploymentRates = getUnemploymentRatesByCountry(data, "United States");

    const percentageChangeOverLastYear =
        unemploymentRates[unemploymentRates.length - 1]?.rate -
        unemploymentRates[unemploymentRates.length - 2]?.rate;

    console.log("Percentage Change Over Last Year:", percentageChangeOverLastYear);

    //console.log("Unemployment Rates for United States:", unemploymentRates);

    const chartConfig = {
        desktop: {
            label: "rate",
            color: "#BDDDE4",
        },
    };

    return (
        <div>
            Unemployment by country
            <div>
                <Combobox initialValue="Select Country..." />
                <ChartBarDefault
                    dataKeyXAxis="year"
                    dataKeyBar="rate"
                    chartData={unemploymentRates}
                    chartConfig={chartConfig}
                    cardTitle="Unemployment Rate in the United States"
                    cardDescription="From 1980 to 2024 in % of the total labor force"
                    percentageChange={percentageChangeOverLastYear}
                />
            </div>
        </div>
    );
}
