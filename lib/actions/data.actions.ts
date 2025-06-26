"use server";

import { connectToDB } from "@/lib/mongodb";

export async function getData() {
    try {
        connectToDB();
        console.log("Connected to the database successfully");
    } catch (error: any) {
        console.log(error);
    }
}
