import React from "react";
import parseLocalJSON from "@/utils/parseLocalJSON";

type CountryData = {
    [key: string]: string;
};

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
    // Load the unemployment data from a local JSON file
    const data = await parseLocalJSON("/lib/data/inflation.json");
    console.log("Inflation Data:", data);
    const isoCountryData = await parseLocalJSON("/lib/data/iso-country-list.json");
    const { country } = await searchParams;
    const currentLastDataYear = 2024;
    const startingCountry = "United States";

    const chartConfig = {
        rate: {
            label: "Unemployment Rate",
            color: "#BDDDE4",
        },
    };

    function getAllCountries(data: CountryData[]): string[] {
        return data.map((entry) => entry["Country Name"]).filter(Boolean);
    }

    const allCountries = getAllCountries(data);
    console.log("All Countries:", allCountries);

    return <div>test</div>;
}
