import { getDataById } from "@/lib/actions/data.actions";
import React from "react";
import PageTitle from "@/components/title/PageTitle";
import { Bird } from "lucide-react";
import WorldMapPage from "@/components/maps/WorldMapPage";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type CountryData = {
    [key: string]: string;
};

export default async function page() {
    // Load the data from a MongoDB collection
    const mongoDBChartId = "686fbd2e80587170605182d0";
    const dataMigration = await getDataById({ dataId: mongoDBChartId });
    const data = dataMigration?.entries as CountryData[];

    return (
        <div className="flex w-full flex-col items-start gap-4 p-4 max-w-7xl mx-auto">
            {/* Title and section header */}
            <PageTitle
                title="Net Migration by country"
                svg={<Bird className="ml-2 h-6 w-6 text-orange-500" />}
            />
            {/* World Map */}
            <section className="flex flex-col w-full gap-4">
                <Card className="flex w-full h-full">
                    <CardHeader>
                        <CardTitle>Global Migration Overview</CardTitle>
                        <CardDescription>
                            Interactive world map showing Net Migration by country {2024}
                        </CardDescription>
                    </CardHeader>
                    {/* Here you would include your WorldMapInteractive component */}
                    <div className="flex w-[90%] h-full mx-auto">
                        <WorldMapPage
                            mongoDBMapId={mongoDBChartId}
                            rateYear="2024"
                            legend={{
                                show: true,
                                legendRate: [0, 15000, 500000],
                            }}
                            isPercentage={false}
                            labelName="Net Migration"
                        />
                    </div>
                </Card>
            </section>
            <div className="flex w-full relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Series
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                2022
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                2023
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
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
                                <td className="px-6 py-4 text-right">{entry["2022"]}</td>
                                <td className="px-6 py-4 text-right">{entry["2023"]}</td>
                                <td className="px-6 py-4 text-right">{entry["2024"]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
