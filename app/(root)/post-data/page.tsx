import PostData from "@/components/data/PostData";
import ReplaceData from "@/components/data/ReplaceData";
import PageTitle from "@/components/title/PageTitle";
import { getDataById } from "@/lib/actions/data.actions";
import parseLocalJSON from "@/utils/parseLocalJSON";
import { Database } from "lucide-react";
import React from "react";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function page() {
    const mongoDBId = "686ba61f732e155ab8bc92eb";
    const data = await parseLocalJSON("lib/data/net-migration-by-country.json");
    const dataMongoDB = await getDataById({ dataId: mongoDBId });
    console.log(dataMongoDB, "MONGODB DATA");
    console.log(data, "LOCAL DATA");

    return (
        <div className="flex w-full flex-col items-start gap-4 p-4 max-w-7xl mx-auto">
            <PageTitle
                title="Post Data to Database"
                svg={<Database className="h-6 w-6 text-orange-500" />}
            />
            <PostData dataInfo={JSON.stringify(data)} disabled={false} />
            <ReplaceData dataInfo={JSON.stringify(data)} dataId={mongoDBId} disabled={true} />
        </div>
    );
}
