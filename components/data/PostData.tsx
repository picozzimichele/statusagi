"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function PostData({ dataInfo }: { dataInfo?: string }) {
    const dataInfoParsed = dataInfo ? JSON.parse(dataInfo) : null;

    const uploadData = async () => {
        if (!dataInfoParsed) {
            toast.error("No data to upload.");
            return;
        }

        try {
            // Simulate an API call to upload data
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Data uploaded successfully!");
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
