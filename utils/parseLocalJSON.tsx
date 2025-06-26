"use server";

import path from "path";
import { promises as fs } from "fs";

async function parseLocalJSON(jsonPath: string) {
    try {
        const pathToJSON = jsonPath;
        const filePath = path.join(process.cwd(), pathToJSON);
        const file = await fs.readFile(filePath, "utf8");
        const data = await JSON.parse(file);
        return data;
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return null;
    }
}

export default parseLocalJSON;
