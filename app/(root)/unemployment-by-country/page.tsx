import React from "react";
import parseLocalJSON from "@/utils/parseLocalJSON";
import { ChartBarDefault } from "@/components/charts/chart-bar-default";

export default async function Page() {
    const data = await parseLocalJSON("/lib/data/unemployment-by-country.json");
    console.log("Unemployment by Country Data:", data);
    return (
        <div>
            Unemployment by country
            <div>
                <ChartBarDefault />
            </div>
        </div>
    );
}
