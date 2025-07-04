import PostData from "@/components/data/PostData";
import PageTitle from "@/components/title/PageTitle";
import { getDataById } from "@/lib/actions/data.actions";
import parseLocalJSON from "@/utils/parseLocalJSON";
import { Database } from "lucide-react";
import React from "react";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function page() {
    const data = await parseLocalJSON("lib/data/unemployment-by-country.json");
    console.log(data);

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
