import PostData from "@/components/data/PostData";
import PageTitle from "@/components/title/PageTitle";
import { getDataById } from "@/lib/actions/data.actions";
import parseLocalJSON from "@/utils/parseLocalJSON";
import { Database } from "lucide-react";
import React from "react";

export default async function page() {
    const data = await parseLocalJSON("lib/data/inflation-by-country.json");
    const dataInflationMongoDB = await getDataById({ dataId: "685d8030a4374acca0b25ec9" });

    console.log("dataInflationMongoDB", dataInflationMongoDB);
    return (
        <div className="flex w-full flex-col items-start gap-4 p-4 max-w-7xl mx-auto">
            <PageTitle
                title="Post Data to Database"
                svg={<Database className="h-6 w-6 text-orange-500" />}
            />
            <PostData dataInfo={JSON.stringify(data)} />
        </div>
    );
}
