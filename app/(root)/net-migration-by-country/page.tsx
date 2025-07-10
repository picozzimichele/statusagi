import { getDataById } from "@/lib/actions/data.actions";
import React from "react";
import PageTitle from "@/components/title/PageTitle";
import { Bird } from "lucide-react";

type CountryData = {
    [key: string]: string;
};

export default async function page() {
    // Load the data from a MongoDB collection
    const mongoDBChartId = "686fbd2e80587170605182d0";
    const dataMigration = await getDataById({ dataId: mongoDBChartId });
    const data = dataMigration?.entries as CountryData[];
    console.log("Data Migration:", data);

    return (
        <div className="flex w-full flex-col items-start gap-4 p-4 max-w-7xl mx-auto">
            {/* Title and section header */}
            <PageTitle
                title="Net Migration by country"
                svg={<Bird className="ml-2 h-6 w-6 text-orange-500" />}
            />
            <div className="max-w-5xl">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right">
                        <thead className="text-xs uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Country
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Series
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    2022
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    2023
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    2024
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((entry, index) => (
                                <tr key={index} className="border-b">
                                    <th scope="row" className="px-6 py-4 font-medium">
                                        {entry["Country Name"]}
                                    </th>
                                    <td className="px-6 py-4">{entry["Series Name"]}</td>
                                    <td className="px-6 py-4">{entry["2022"]}</td>
                                    <td className="px-6 py-4">{entry["2023"]}</td>
                                    <td className="px-6 py-4">{entry["2024"]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
