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

export async function getDataById({ dataId }: { dataId: string }) {
    try {
        await connectToDB();

        const data = await Data.findOne({ _id: dataId });

        console.log("been called");

        return data;
    } catch (error: any) {
        console.log(error);
    }
}
