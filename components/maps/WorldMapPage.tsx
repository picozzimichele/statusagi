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

export default async function WorldMapPage({
    mongoDBMapId,
    labelName = "Debt Level",
    legend = {
        show: true,
        legendRate: [100, 150, 170],
    },
    rateYear = "2023",
    isPercentage,
}: {
    mongoDBMapId: string;
    labelName?: string;
    legend?: {
        show: boolean;
        legendRate: number[];
    };
    rateYear?: string;
    isPercentage: boolean;
}) {
    // Load the government debt data from MongoDB
    const dataMongoDBMapData = await getDataById({ dataId: mongoDBMapId });
    const data = dataMongoDBMapData?.entries as CountryData[];

    console.log(data, "Data dataMongoDBMapData");

    const dataMongoDBIsoCountry = await getDataById({ dataId: "686ba68f732e155ab8bc92f1" });
    const isoCountryData = dataMongoDBIsoCountry?.entries as MetadataEntry[];

    function getMostRecentYear(entry, year) {
        const current = entry[`${year}`];
        if (current !== null && current !== undefined && current !== "" && current !== "..") {
            return current;
        }
        const previous = entry[`${year - 1}`];
        if (previous !== null && previous !== undefined && previous !== "" && previous !== "..") {
            return previous;
        }

        const previous2 = entry[`${year - 2}`];
        if (
            previous2 !== null &&
            previous2 !== undefined &&
            previous2 !== "" &&
            previous2 !== ".."
        ) {
            return previous2;
        }

        return ""; // nothing found in 2023 or 2022
    }

    function getTopCountries(dataset: CountryData[], year: string, topN?: number) {
        const newDataset = dataset.map((entry) => {
            const countryName = entry["Country Name"];
            const countryAlpha3 = entry["Country Code"];
            const rate2023 = getMostRecentYear(entry, year);

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
        const cleanedData = getTopCountries(data, rateYear.toString());
        console.log("mergeDataWithIsoCodes");

        const mergedData = cleanedData.map((entry) => {
            const match = isoCountryData.find((isoEntry) => isoEntry["Alpha-3"] === entry.Alpha3);

            if (match) {
                return {
                    Country: entry.country,
                    "Alpha-2": match["Alpha-2"],
                    "Alpha-3": match["Alpha-3"],
                    [rateYear]: isNaN(entry.rate) ? "N/A" : entry.rate,
                };
            } else {
                return {
                    Country: entry.country,
                    "Alpha-2": "No Match",
                    "Alpha-3": entry.Alpha3,
                    [rateYear]: isNaN(entry.rate) ? "N/A" : entry.rate,
                };
            }
        });

        return mergedData;
    }

    const mapData = mergeDataWithIsoCodes(data, isoCountryData);

    console.log("mapData", mapData);

    return (
        <WorldMapInteractive
            countryData={mapData}
            labelName={labelName}
            legend={legend}
            rateYear={rateYear}
            isPercentage={isPercentage} // Assuming the rate is a percentage
        />
    );
}
