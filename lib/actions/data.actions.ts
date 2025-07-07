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

        return data;
    } catch (error: any) {
        console.log(error);
    }
}

export async function migrateData({ dataId }: { dataId: string }) {
    try {
        await connectToDB();

        const data = await Data.findOne({ _id: dataId });
        if (data) {
            const docObj = data.toObject();
            const entries: any = [];
            for (const key of Object.keys(docObj)) {
                if (!isNaN(Number(key))) {
                    const raw = docObj[key];

                    const data: Record<string, string | null> = {};
                    for (const [k, v] of Object.entries(raw)) {
                        if (/^\d{4} \[YR\d{4}\]$/.test(k)) {
                            const year = k.slice(0, 4);
                            data[year] = v === ".." ? null : String(v);
                        }
                    }

                    entries.push({
                        seriesName: raw["Series Name"],
                        seriesCode: raw["Series Code"],
                        countryName: raw["Country Name"],
                        countryCode: raw["Country Code"],
                        data,
                    });
                }
            }

            console.log("Migrating data...");
            console.log(entries, "entries");
            const newDoc = {
                _id: dataId,
                entries,
            };
            await Data.replaceOne({ _id: dataId }, newDoc);
            console.log(`🔁 Replaced doc with _id: ${dataId}`);
        }
        console.log("🎉 Migration complete");
        process.exit(0);
    } catch (error: any) {
        console.log(error);
        console.error("❌ Migration failed:", error);
        process.exit(1);
    }
}
