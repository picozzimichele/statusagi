"use server";

import { connectToDB } from "@/lib/mongodb";
import Data from "../models/data.models";
import * as mongoose from "mongoose";

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

export async function getDataById({ dataId }: { dataId: string }) {
    try {
        await connectToDB();

        const query: any = { _id: dataId };

        const data = await Data.findById(query).lean();

        return data;
    } catch (error: any) {
        console.log(error);
    }
}

export async function getDataByIdFiltered({ dataId, country, seriesName }: GetDataByIdParams) {
    try {
        await connectToDB();

        const matchConditions: any[] = [];

        if (country) {
            matchConditions.push({
                $eq: ["$$entry.Country Name", country],
            });
        }

        if (seriesName) {
            matchConditions.push({
                $eq: ["$$entry.Series Name", seriesName],
            });
        }

        const data = await Data.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(dataId),
                },
            },
            {
                $project: {
                    entries: {
                        $filter: {
                            input: "$entries",
                            as: "entry",
                            cond: matchConditions.length ? { $and: matchConditions } : true,
                        },
                    },
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ]);

        return data[0] || null;
    } catch (error: any) {
        console.log(error);
    }
}
