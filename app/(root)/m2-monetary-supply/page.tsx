import React from "react";
import parseLocalJSON from "@/utils/parseLocalJSON";
import { ChartLineDefault } from "@/components/charts/chart-line-default";

export default async function page() {
    // Load the data from a local JSON file
    const data = await parseLocalJSON("/lib/data/M2-24062025.json");

    const chartData = data.map((item) => ({
        ...item,
        date: new Date(item.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }),
        M2SL: parseFloat(item.M2SL.replace(",", "")),
    }));

    console.log("Parsed chart data", chartData);

    console.log("M2 data", data);
    return (
        <div className="flex w-full flex-col items-start gap-4 p-4 max-w-7xl mx-auto">
            <section className="flex w-full h-full gap-4 flex-col lg:flex-row bg-green-50">
                <ChartLineDefault chartData={chartData} />
            </section>
        </div>
    );
}
