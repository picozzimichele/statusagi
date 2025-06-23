import React from "react";
import parseLocalJSON from "@/utils/parseLocalJSON";

type CountryData = {
    [key: string]: string;
};

type ChartEntry = {
    year: string;
    rate: number;
};

type ISOJsonCountryCheck = {
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
    // Load the unemployment data from a local JSON file
    const data = await parseLocalJSON("/lib/data/inflation.json");
    const isoCountryData = await parseLocalJSON("/lib/data/iso-country-list.json");

    const startingCountry = "United States";

    const { country } = await searchParams;
    return <div>page</div>;
}
