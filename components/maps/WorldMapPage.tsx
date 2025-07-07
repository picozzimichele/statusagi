import React from "react";
import WorldMapInteractive from "./WorldMapInteractive";
import { getDataById } from "@/lib/actions/data.actions";

type MetadataEntry = {
    Country: string;
    "Alpha-2": string;
    "Alpha-3": string;
    Numeric: number;
    Latitude?: number;
    Longitude?: number;
};

type CountryData = {
    [key: string]: string;
};

export default async function WorldMapPage() {
    // Load the government debt data from MongoDB
    const mongoDBDebtId = "686ba2cb732e155ab8bc92b1";
    const dataMongoDBDebt = await getDataById({ dataId: mongoDBDebtId });
    const data = dataMongoDBDebt?.entries as CountryData[];

    const dataMongoDBIsoCountry = await getDataById({ dataId: "686ba68f732e155ab8bc92f1" });
    const isoCountryData = dataMongoDBIsoCountry?.entries as MetadataEntry[];

    const currentLastDataYear = 2023;

    function getTopCountries(dataset: CountryData[], year: string, topN?: number) {
        const newDataset = dataset.map((entry) => {
            const countryName = entry["Country Name"];
            const countryAlpha3 = entry["Country Code"];
            const rate2023 = entry["2023 [YR2023]"];

            return {
                country: countryName,
                Alpha3: countryAlpha3,
                rate: parseFloat(Number(rate2023.toString().replace(",", ".")).toFixed(1)),
            };
        });

        // Return early if no topN is specified or is less than or equal to 0
        if (!topN || topN <= 0) {
            return newDataset;
        }

        const sorted = newDataset
            .filter((entry) => !isNaN(entry.rate))
            .sort((a, b) => b.rate - a.rate)
            .slice(0, topN);

        return sorted;
    }

    function mergeDataWithIsoCodes(data: CountryData[], isoCountryData: MetadataEntry[]) {
        const cleanedData = getTopCountries(data, currentLastDataYear.toString());
        console.log("mergeDataWithIsoCodes");

        const mergedData = cleanedData.map((entry) => {
            const match = isoCountryData.find((isoEntry) => isoEntry["Alpha-3"] === entry.Alpha3);

            if (match) {
                return {
                    Country: entry.country,
                    "Alpha-2": match["Alpha-2"],
                    "Alpha-3": match["Alpha-3"],
                    "2023": isNaN(entry.rate) ? "N/A" : entry.rate,
                };
            } else {
                return {
                    Country: entry.country,
                    "Alpha-2": "No Match",
                    "Alpha-3": entry.Alpha3,
                    "2023": isNaN(entry.rate) ? "N/A" : entry.rate,
                };
            }
        });

        return mergedData;
    }

    const mapData = mergeDataWithIsoCodes(data, isoCountryData);

    return (
        <WorldMapInteractive
            countryData={mapData}
            labelName={"Debt Level"}
            legend={{
                show: true,
                legendRate: [100, 150, 170],
            }}
            rateYear="2023"
        />
    );
}
