"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { createData } from "@/lib/actions/data.actions";

export default function PostData({ dataInfo }: { dataInfo?: string }) {
    const dataInfoParsed = dataInfo ? JSON.parse(dataInfo) : null;

    const uploadData = async () => {
        if (!dataInfoParsed) {
            toast.error("No data to upload.");
            return;
        }

        try {
            console.log("Data uploaded:", dataInfoParsed);
            // Call the server action to upload data
            const dataId = await createData(dataInfoParsed);
            toast.success("Data uploaded successfully!", {
                description: `Data ID: ${dataId}`,
            });
        } catch (error) {
            console.error("Error uploading data:", error);
            toast.error("Failed to upload data.");
        }
    };

    return (
        <div>
            <Button onClick={() => uploadData()}>Upload Data</Button>
        </div>
    );
}
