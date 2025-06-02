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
            if (/^\d{4}$/.test(key) && target[key] && !isNaN(Number(target[key]))) {
                result.push({
                    year: key,
                    rate: parseFloat(target[key]),
                });
            }
        }

        return result;
    }

    const unemploymentRates = getUnemploymentRatesByCountry(data, "United States");
    console.log("Unemployment Rates for United States:", unemploymentRates);

    return (
        <div>
            Unemployment by country
            <div>
                <Combobox initialValue="Select Country..." />
                <ChartBarDefault />
            </div>
        </div>
    );
}
