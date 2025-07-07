"use server";

import { connectToDB } from "@/lib/mongodb";
import Data from "../models/data.models";
import * as mongoose from "mongoose";

interface GetDataByIdParams {
    dataId: string;
    country?: string;
    countryFieldName?: string;
    seriesName?: string;
}

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

        const query: any = { _id: dataId };

        const data = await Data.findById(query).lean();

        return data;
    } catch (error: any) {
        console.log(error);
    }
}

export async function getDataByIdFiltered({
    dataId,
    country,
    countryFieldName,
    seriesName,
}: GetDataByIdParams) {
    try {
        await connectToDB();

        const matchConditions: any[] = [];

        if (country && country?.length > 0) {
            matchConditions.push({
                $eq: [{ $getField: { field: countryFieldName, input: "$$entry" } }, country],
            });
        }

        if (seriesName && seriesName?.length > 0) {
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

// TODO:implement this function to get top countries by value
export async function getTopCountriesByValue({ dataId }: { dataId: string }) {
    try {
        await connectToDB();
    } catch (error: any) {
        console.log(error);
    }
}

export async function replaceData({ dataId, newData }: { dataId: string; newData: any }) {
    try {
        await connectToDB();

        const dataReplaced = await Data.replaceOne({ _id: dataId }, { ...newData });
    } catch (error: any) {
        console.log(error);
    }
}
