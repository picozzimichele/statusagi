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

export async function getData() {
    try {
        connectToDB();
        console.log("Connected to the database successfully");
    } catch (error: any) {
        console.log(error);
    }
}
