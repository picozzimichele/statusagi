"use server";

import { connectToDB } from "@/lib/mongodb";
import Data from "../models/data.models";

export async function createData(data: any) {
    try {
        await connectToDB();
        const newData = await Data.create({ ...data });
        return JSON.parse(JSON.stringify(newData._id));
    } catch (error: any) {
        console.log(error);
    }
}
interface GetDataByIdParams {
    dataId: string;
    country?: string;
    seriesName?: string;
}

export async function getDataById({ dataId, country, seriesName }: GetDataByIdParams) {
    try {
        await connectToDB();

        const query: any = { _id: dataId };

        if (country) {
            query["entries.Country Name"] = country;
        }

        if (seriesName) {
            query["entries.Series Name"] = seriesName;
        }

        const data = await Data.findOne(query).lean();

        return data;
    } catch (error: any) {
        console.log(error);
    }
}
