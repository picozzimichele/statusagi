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

    const unemploymentRates1 = [
        { year: "1980", rate: 7.175 },
        { year: "1981", rate: 7.617 },
        { year: "1982", rate: 9.708 },
        { year: "1983", rate: 9.6 },
        { year: "1984", rate: 7.508 },
        { year: "1985", rate: 7.192 },
        { year: "1986", rate: 7 },
        { year: "1987", rate: 6.175 },
        { year: "1988", rate: 5.492 },
        { year: "1989", rate: 5.258 },
        { year: "1990", rate: 5.617 },
        { year: "1991", rate: 6.85 },
        { year: "1992", rate: 7.492 },
        { year: "1993", rate: 6.908 },
        { year: "1994", rate: 6.1 },
        { year: "1995", rate: 5.592 },
        { year: "1996", rate: 5.408 },
        { year: "1997", rate: 4.942 },
        { year: "1998", rate: 4.5 },
        { year: "1999", rate: 4.217 },
        { year: "2000", rate: 3.967 },
        { year: "2001", rate: 4.742 },
        { year: "2002", rate: 5.783 },
        { year: "2003", rate: 5.992 },
        { year: "2004", rate: 5.542 },
        { year: "2005", rate: 5.083 },
        { year: "2006", rate: 4.608 },
        { year: "2007", rate: 4.617 },
        { year: "2008", rate: 5.8 },
        { year: "2009", rate: 9.283 },
        { year: "2010", rate: 9.608 },
        { year: "2011", rate: 8.933 },
        { year: "2012", rate: 8.075 },
        { year: "2013", rate: 7.358 },
        { year: "2014", rate: 6.158 },
        { year: "2015", rate: 5.275 },
        { year: "2016", rate: 4.875 },
        { year: "2017", rate: 4.358 },
        { year: "2018", rate: 3.892 },
        { year: "2019", rate: 3.675 },
        { year: "2020", rate: 8.1 },
        { year: "2021", rate: 5.358 },
        { year: "2022", rate: 3.642 },
        { year: "2023", rate: 3.633 },
        { year: "2024", rate: 4.033 },
        { year: "2025", rate: 4.159 },
        { year: "2026", rate: 4.151 },
        { year: "2027", rate: 4.079 },
        { year: "2028", rate: 3.929 },
        { year: "2029", rate: 3.801 },
        { year: "2030", rate: 3.759 },
    ];

    const chartConfig = {
        desktop: {
            label: "Unemployment Rate",
            color: "#60a5fa",
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
                    chartData={unemploymentRates1}
                    chartConfig={chartConfig}
                />
            </div>
        </div>
    );
}
