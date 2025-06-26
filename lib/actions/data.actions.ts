"use server";

import { connectToDB } from "@/lib/mongodb";
import Data from "../models/data.models";

export async function createData(data: any) {
    try {
        connectToDB();
        const newData = await Data.create({ ...data });
        return JSON.parse(JSON.stringify(newData._id));
    } catch (error: any) {
        console.log(error);
    }
}

export async function getDataById({ dataId }: { dataId: string }) {
    try {
        connectToDB();

        const data = await Data.findOne({ _id: dataId });

        return { data: { ...data, _id: data._id.toString() } };
    } catch (error: any) {
        console.log(error);
    }
}
