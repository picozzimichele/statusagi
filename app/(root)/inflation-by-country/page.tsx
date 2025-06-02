import React from "react";
import parseLocalJSON from "@/utils/parseLocalJSON";

export default async function Page() {
    const data = await parseLocalJSON("/lib/data/inflation-by-country.json");
    console.log("Inflation by Country Data:", data);
    return <div>Inflation by country</div>;
}
